'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import axios from 'axios';

import Input from '../common/Input';
import Heading from '../common/Heading';
import Button from '../common/Button';
import { SignupRequest, SignupValidator } from '@/src/lib/validators/auth';

const SignupForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<SignupRequest>({
    resolver: zodResolver(SignupValidator),
  });

  const resetFields = () => {
    resetField('name');
    resetField('document');
    resetField('email');
    resetField('password');
  };

  const onSubmit: SubmitHandler<SignupRequest> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/signup', data)
      .then((response) => {
        toast.success(response?.data);
        router.replace('/login');
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
        resetFields();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Heading title="Empezemos" subtitle="Crea una cuenta para continuar" />
      <div className="grid gap-2 md:grid-cols-2">
        <Input
          id="name"
          label="Nombre"
          placeholder="Juan Pérez"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="document"
          label="Número de cédula"
          placeholder="1700000000"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>

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
        label="Crear Cuenta"
        onClick={handleSubmit(onSubmit)}
      />
      <div className="flex flex-row items-center justify-center gap-2 font-light">
        <div>¿Ya tienes una cuenta?</div>
        <Link
          href="/login"
          className="cursor-pointer font-medium decoration-dotted hover:underline"
        >
          Inicia sesión
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
