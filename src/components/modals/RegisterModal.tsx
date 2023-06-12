'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import axios from 'axios';

// import useRegisterModal from '../../hooks/useRegisterModal';
import useRegisterModal from '../../hooks/useRegisterModal';

import Modal from './Modal';
import Heading from '../ui/Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterModal = () => {
  const router = useRouter();

  // const registerModal = useRegisterModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/admin/register', data)
      .then(() => {
        toast.success('Success!');
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Registro" subtitle="Ingresa en tu cuenta" />
      <Input
        id="name"
        label="Nombre"
        placeholder="Victor"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Correo electrónico"
        placeholder="usuario@correo.com"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <div
        className="
          mt-4
          text-center
          font-light
          text-neutral-500
        "
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <div>¿No tienes una cuenta?</div>
          <div
            onClick={toggle}
            className="
              cursor-pointer
              text-neutral-800
              hover:underline
            "
          >
            Regístrate
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
