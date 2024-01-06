'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { CandidateType } from '@prisma/client';

import { SafeCandidate, SafeParty } from '@/types';
import {
  CandidateRequest,
  CandidateValidator,
} from '@/lib/validators/candidate';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UploadDropzone } from '@/lib/uploadthing';

interface CandidateFormProps {
  initialData?: SafeCandidate | null;
  parties: SafeParty[] | null;
}

const CandidateForm: React.FC<CandidateFormProps> = ({
  initialData,
  parties,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CandidateRequest>({
    resolver: zodResolver(CandidateValidator),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      document: initialData?.document || '',
      partyId: initialData?.partyId || '',
      type: initialData?.type || '',
      image: {
        key: initialData?.imageKey || '',
        url: initialData?.imageUrl || '',
      },
    },
  });

  const onSubmit: SubmitHandler<CandidateRequest> = (data) => {
    setIsLoading(true);

    if (initialData) {
      axios
        .put(`/api/candidates/${initialData?.id}`, data)
        .then(() => {
          toast({
            title: 'Actualizado correctamente',
          });
          router.replace('/dashboard/candidates');
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: 'Ocurrió un error',
            description: JSON.stringify(JSON.stringify(error?.response?.data)),
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post('/api/candidates', data)
        .then(() => {
          toast({
            title: 'Creado correctamente',
          });
          router.replace('/dashboard/candidates');
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: 'Ocurrió un error',
            description: JSON.stringify(JSON.stringify(error?.response?.data)),
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const typeOptions = [
    {
      label: 'Principal',
      value: CandidateType.PRIMARY,
    },
    {
      label: 'Alterno',
      value: CandidateType.SECONDARY,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Juan Pérez"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Cédula</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="1700000000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="juan.perez@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de candidato</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Seleccione un tipo"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="partyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partido Político</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Seleccione un partido"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parties?.map((party) => (
                      <SelectItem key={party.id} value={party.id}>
                        {party.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto del candidato</FormLabel>
              <FormControl>
                <UploadDropzone
                  endpoint="candidates"
                  onClientUploadComplete={(res) => {
                    field.onChange(res?.[0]);
                    toast({
                      title: 'Foto subida correctamente',
                    });
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      title: 'Ocurrió un error',
                      description: error.message,
                      variant: 'destructive',
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Actualizar' : 'Crear'}
        </Button>
      </form>
    </Form>
  );
};

export default CandidateForm;
