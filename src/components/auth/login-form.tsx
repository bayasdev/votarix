'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { LoginRequest, LoginValidator } from '@/lib/validators/auth';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  const error = searchParams?.get('error');

  if (error) {
    toast({
      title: error,
      variant: 'destructive',
    });
  }

  function onSubmit(data: LoginRequest) {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });

    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              placeholder="usuario@ejemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Contraseña</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}
