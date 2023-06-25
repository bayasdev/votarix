'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

import Input from '../common/Input';
import Heading from '../common/Heading';
import Button from '../common/Button';

const LoginClient = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .email('El correo electrónico ingresado no es válido')
      .min(1, 'Ingrese su correo electrónico'),
    password: z.string().min(1, 'Ingrese una contraseña'),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      resetField('email');
      resetField('password');

      if (callback?.ok) {
        toast.success('Sesión iniciada');
        router.replace('/');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading title="Bienvenido de nuevo" subtitle="Ingresa en tu cuenta" />
      <Input
        id="email"
        label="Correo electrónico"
        placeholder="usuario@correo.com"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Button
        disabled={isLoading}
        label="Iniciar Sesión"
        onClick={handleSubmit(onSubmit)}
      />
      <div className="flex flex-row items-center justify-center gap-2 font-light">
        <div>¿No tienes una cuenta?</div>
        <Link
          href="/signup"
          className="cursor-pointer font-medium decoration-dotted hover:underline"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default LoginClient;
