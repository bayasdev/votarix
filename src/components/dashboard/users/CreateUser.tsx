'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineAdd, MdOutlineRestore } from 'react-icons/md';

import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Select from '../../common/Select';
import { UserRequest, UserValidator } from '@/src/lib/validators/user';
import { Role } from '@prisma/client';

const CreateUser = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<UserRequest>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      name: '',
      email: '',
      document: '',
      role: '',
    },
  });

  const resetFields = () => {
    resetField('name');
    resetField('email');
    resetField('document');
  };

  const onSubmit: SubmitHandler<UserRequest> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/users', data)
      .then(() => {
        toast.success('Creado correctamente');
        router.replace('/dashboard/users');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const roleOptions = [
    {
      label: 'Administrador',
      value: Role.ADMIN,
    },
    {
      label: 'Votante',
      value: Role.VOTER,
    },
  ];

  const bodyContent = (
    <div className="flex flex-col gap-8">
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
          id="email"
          label="Correo Electrónico"
          placeholder="jperez@gmail.com"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <Input
          id="document"
          label="Número de cédula"
          placeholder="1700000000"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Select
          id="role"
          label="Rol"
          placeholder="Seleccione uno"
          options={roleOptions}
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );

  const actionsContent = (
    <div className="flex gap-2">
      <Button
        label="Crear usuario"
        icon={MdOutlineAdd}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      <Button
        label="Restablecer"
        icon={MdOutlineRestore}
        onClick={resetFields}
        disabled={isLoading}
        color="ghost"
      />
    </div>
  );
  return <Card bodyContent={bodyContent} actionsContent={actionsContent} />;
};

export default CreateUser;
