'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { LoginRequest, LoginValidator } from '@/lib/validators/auth';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/shared/icons';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useMemo(() => {
    const error = searchParams?.get('error');

    if (error) {
      toast({
        title: error || 'Algo salió mal',
        variant: 'destructive',
      });
    }
  }, [searchParams]);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    setIsLoading(true);

    await signIn('credentials', {
      ...data,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });

    setIsLoading(false);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="usuario@ejemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
