'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { PartyProposal, SafeParty, SafePositionWithElection } from '@/types';
import { PartyRequest, PartyValidator } from '@/lib/validators/party';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UploadDropzone } from '@/lib/uploadthing';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PartyFormProps {
  initialData?: SafeParty | null;
  positions: SafePositionWithElection[] | null;
}

const PartyForm: React.FC<PartyFormProps> = ({ initialData, positions }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newProposal, setNewProposal] = useState<PartyProposal>({
    name: '',
    description: '',
  });

  const form = useForm<PartyRequest>({
    resolver: zodResolver(PartyValidator),
    defaultValues: {
      name: initialData?.name || '',
      positionId: initialData?.positionId || '',
      image: {
        key: initialData?.imageKey || '',
        url: initialData?.imageUrl || '',
      },
      proposals: JSON.parse(initialData?.proposals || '[]'),
    },
  });

  // The useFieldArray hook from react-hook-form manages the dynamic fields for the proposals array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'proposals',
  });

  const onSubmit: SubmitHandler<PartyRequest> = (data) => {
    setIsLoading(true);
    if (initialData) {
      axios
        .put(`/api/parties/${initialData?.id}`, data)
        .then(() => {
          toast({
            title: 'Actualizado correctamente',
          });
          router.replace('/dashboard/parties');
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: 'Ocurrió un error',
            description: JSON.stringify(error?.response?.data),
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post('/api/parties', data)
        .then(() => {
          toast({
            title: 'Creado correctamente',
          });
          router.replace('/dashboard/parties');
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: 'Ocurrió un error',
            description: JSON.stringify(error?.response?.data),
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Alianza Full-Stack"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="positionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dignidad de elección popular</FormLabel>
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
                      placeholder="Seleccione una dignidad"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} ({item.electionName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo del partido</FormLabel>
              <FormControl>
                <UploadDropzone
                  endpoint="parties"
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
        {/* Existing proposals from initialData */}
        {fields?.length > 0 && (
          <>
            <Label className="inline-flex">Propuestas del partido</Label>
            {fields?.map((proposal, index) => (
              <div key={proposal.id} className="grid gap-6 lg:grid-cols-8">
                <FormField
                  control={form.control}
                  name={`proposals.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="col-span-full lg:col-span-3">
                      <FormLabel>Nombre de la propuesta</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Nombre de la propuesta"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`proposals.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="col-span-full lg:col-span-4">
                      <FormLabel>Descripción de la propuesta</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder="Descripción de la propuesta"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="self-center"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Icons.trash className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            ))}
          </>
        )}
        {/* New proposal inputs */}
        <Label className="inline-flex">Crear nueva propuesta</Label>
        <div className="grid gap-6 md:grid-cols-8">
          <div className="col-span-full space-y-2 lg:col-span-3">
            <Label>Nombre de la propuesta</Label>
            <Input
              disabled={isLoading}
              placeholder="Nombre de la propuesta"
              className=""
              value={newProposal.name}
              onChange={(e) => {
                setNewProposal({
                  ...newProposal,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-span-full space-y-2 lg:col-span-4">
            <Label>Descripción de la propuesta</Label>
            <Textarea
              disabled={isLoading}
              placeholder="Descripción de la propuesta"
              className="resize-none"
              value={newProposal.description}
              onChange={(e) => {
                setNewProposal({
                  ...newProposal,
                  description: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-span-full self-center lg:col-span-1">
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                append(newProposal);
                setNewProposal({
                  name: '',
                  description: '',
                });
              }}
            >
              <Icons.add className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Actualizar' : 'Crear'}
        </Button>
      </form>
    </Form>
  );
};

export default PartyForm;
