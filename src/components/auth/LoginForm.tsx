'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/src/types';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();

  if (currentUser) {
    router.replace('/');
  }

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z
      .string({ required_error: 'Requerido' })
      .email('Correo electrónico no válido'),
    password: z.string({ required_error: 'Requerido' }),
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
    <div className="flex flex-col gap-8">
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
      <div className="flex flex-row items-center justify-center gap-2 font-light text-neutral-500">
        <div>¿No tienes una cuenta?</div>
        <div
          onClick={() => router.push('/auth/signup')}
          className="
              cursor-pointer
              text-neutral-800
              decoration-dotted
              hover:underline
            "
        >
          Regístrate
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
