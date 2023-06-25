'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineAdd } from 'react-icons/md';

import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';

const CreateParty = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, 'El campo es requerido'),
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

  const resetFields = () => {
    resetField('name');
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/parties', data)
      .then(() => {
        toast.success('Partido político creado!');
        resetFields();
        router.push('/dashboard/parties');
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
    <Button
      label="Crear partido político"
      icon={MdOutlineAdd}
      onClick={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );

  return <Card bodyContent={bodyContent} actionsContent={actionsContent} />;
};

export default CreateParty;
