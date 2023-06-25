'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineEdit, MdOutlineRestore } from 'react-icons/md';

import { SafeParty } from '@/src/types';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';

interface EditPartyProps {
  party: SafeParty | null;
}

const EditParty: React.FC<EditPartyProps> = ({ party }) => {
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
    defaultValues: {
      name: party?.name || '',
    },
  });

  const resetFields = () => {
    resetField('name');
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
    axios
      .put(`/api/parties/${party?.id}`, data)
      .then(() => {
        toast.success('Partido político actualizado!');
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
        label="Editar partido político"
        icon={MdOutlineEdit}
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

export default EditParty;
