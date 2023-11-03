'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { SafeElection } from '@/types';
import { ElectionRequest, ElectionValidator } from '@/lib/validators/election';
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

interface ElectionFormProps {
  initialData?: SafeElection | null;
}

const ElectionForm: React.FC<ElectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const defaultStartTime = new Date();
  const defaultEndTime = dayjs(defaultStartTime).add(2, 'hour').toDate();

  const form = useForm<ElectionRequest>({
    resolver: zodResolver(ElectionValidator),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      startTime: initialData?.startTime
        ? dayjs(initialData.startTime).toDate()
        : defaultStartTime,
      endTime: initialData?.endTime
        ? dayjs(initialData.endTime).toDate()
        : defaultEndTime,
    },
  });

  const onSubmit: SubmitHandler<ElectionRequest> = (data) => {
    setIsLoading(true);
    if (initialData) {
      axios
        .put(`/api/elections/${initialData?.id}`, data)
        .then(() => {
          toast({
            title: 'Actualizado correctamente',
          });
          router.replace('/dashboard/elections');
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: 'Ocurrió un error',
            description: error?.response?.data,
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post('/api/elections', data)
        .then(() => {
          toast({
            title: 'Creado correctamente',
          });
          router.replace('/dashboard/elections');
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: 'Ocurrió un error',
            description: error?.response?.data,
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // for styling react-datepicker
  const inputClasses =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

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
                  placeholder="Elecciones Generales"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Elecciones de representantes estudiantiles al Honorable Consejo Universitario"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field: { onChange, value, disabled } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de inicio</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    disabled={disabled}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    className={inputClasses}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field: { onChange, value, disabled } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de finalización</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    disabled={disabled}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    className={inputClasses}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Actualizar' : 'Crear'}
        </Button>
      </form>
    </Form>
  );
};

export default ElectionForm;
