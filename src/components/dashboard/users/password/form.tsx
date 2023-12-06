'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { User } from 'next-auth';

import { SafeUser } from '@/types';
import {
  UserPasswordRequest,
  UserPasswordValidator,
} from '@/lib/validators/user';
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
import { signOut } from 'next-auth/react';

interface UserPasswordFormProps {
  currentUser?: User | undefined;
  initialData?: SafeUser | null;
}

const UserPasswordForm: React.FC<UserPasswordFormProps> = ({
  currentUser,
  initialData,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserPasswordRequest>({
    resolver: zodResolver(UserPasswordValidator),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserPasswordRequest> = (data) => {
    setIsLoading(true);

    axios
      .post(`/api/users/${initialData?.id}/password`, data)
      .then(() => {
        toast({
          title: 'Contraseña cambiada correctamente',
        });
        if (currentUser?.id === initialData?.id) {
          signOut({
            callbackUrl: '/',
          });
        } else {
          router.replace('/dashboard/users');
          router.refresh();
        }
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={isLoading}
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Cambiar contraseña
        </Button>
      </form>
    </Form>
  );
};

export default UserPasswordForm;
