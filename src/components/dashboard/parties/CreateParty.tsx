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
import { PartyRequest, PartyValidator } from '@/src/lib/validators/party';

const CreateParty = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<PartyRequest>({
    resolver: zodResolver(PartyValidator),
  });

  const resetFields = () => {
    resetField('name');
  };

  const onSubmit: SubmitHandler<PartyRequest> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/parties', data)
      .then(() => {
        toast.success('Partido político creado!');
        router.replace('/dashboard/parties');
        router.refresh();
      })
      .catch(() => {
        toast.error('Algo salió mal!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Input
        id="name"
        label="Nombre del partido político"
        placeholder="Revolución Full-Stack"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  const actionsContent = (
    <div className="flex gap-2">
      <Button
        label="Crear partido político"
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

export default CreateParty;
