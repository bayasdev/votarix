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
import { PositionRequest, PositionValidator } from '@/src/lib/validators/position';

const CreatePosition = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<PositionRequest>({
    resolver: zodResolver(PositionValidator),
  });

  const resetFields = () => {
    resetField('name');
  };

  const onSubmit: SubmitHandler<PositionRequest> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/positions', data)
      .then(() => {
        toast.success('Creado correctamente');
        router.replace('/dashboard/positions');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Input
        id="name"
        label="Nombre del puesto electivo"
        placeholder="Presidente"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  const actionsContent = (
    <div className="flex gap-2">
      <Button
        label="Crear puesto electivo"
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

export default CreatePosition;