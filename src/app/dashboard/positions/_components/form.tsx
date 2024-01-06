'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { SafeElection, SafePosition } from '@/types';
import { PositionRequest, PositionValidator } from '@/lib/validators/position';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PositionFormProps {
  initialData?: SafePosition | null;
  elections?: SafeElection[] | null;
}

const PositionForm: React.FC<PositionFormProps> = ({
  initialData,
  elections,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PositionRequest>({
    resolver: zodResolver(PositionValidator),
    defaultValues: {
      name: initialData?.name || '',
      electionId: initialData?.electionId || '',
    },
  });

  const onSubmit: SubmitHandler<PositionRequest> = (data) => {
    setIsLoading(true);
    if (initialData) {
      axios
        .put(`/api/positions/${initialData?.id}`, data)
        .then(() => {
          toast({
            title: 'Actualizado correctamente',
          });
          router.replace('/dashboard/positions');
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
        .post('/api/positions', data)
        .then(() => {
          toast({
            title: 'Creado correctamente',
          });
          router.replace('/dashboard/positions');
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
                  placeholder="Presidente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elección</FormLabel>
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
                      placeholder="Seleccione una elección"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {elections?.map((election) => (
                    <SelectItem key={election.id} value={election.id}>
                      {election.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default PositionForm;
