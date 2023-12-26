'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { SafeParty } from '@/types';
import { PartyRequest, PartyValidator } from '@/lib/validators/party';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
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

interface PartyFormProps {
  initialData?: SafeParty | null;
}

const PartyForm: React.FC<PartyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PartyRequest>({
    resolver: zodResolver(PartyValidator),
    defaultValues: {
      name: initialData?.name || '',
      image: {
        key: initialData?.imageKey || '',
        url: initialData?.imageUrl || '',
      },
    },
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
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Actualizar' : 'Crear'}
        </Button>
      </form>
    </Form>
  );
};

export default PartyForm;
