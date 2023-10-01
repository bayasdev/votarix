'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineEdit, MdOutlineRestore } from 'react-icons/md';

import { SafePosition } from '@/src/types';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';

interface EditPositionProps {
  position: SafePosition | null;
}

const EditPosition: React.FC<EditPositionProps> = ({ position }) => {
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
      name: position?.name || '',
    },
  });

  const resetFields = () => {
    resetField('name');
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
    axios
      .put(`/api/positions/${position?.id}`, data)
      .then(() => {
        toast.success('Editado correctamente');
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
        label="Editar puesto electivo"
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

export default EditPosition;
