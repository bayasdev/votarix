'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Card from '../../ui/Card';
import Input from '../../inputs/Input';
import Button from '../../ui/Button';
import MarkdownEditor from '../../inputs/MarkdownEditor';
import validateDNI from '@/src/helpers/validateDNI';
import Select from '../../inputs/Select';

const NewCandidate = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, 'El campo es requerido'),
    email: z.string().email('El correo electrónico ingresado no es válido'),
    document: z.custom(
      (value) => validateDNI((value as string) || ''),
      'El número de cédula ingresado no es válido',
    ),
    bio: z.string().optional(),
    proposals: z.string().optional(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const resetFields = () => {
    resetField('name');
    resetField('email');
    resetField('document');
    resetField('bio');
    resetField('proposals');
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/candidates', data)
      .then(() => {
        toast.success('Candidato creado!');
        resetFields();
        router.push('/dashboard/candidates');
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
          id="partyId"
          label="Partido político"
          placeholder="Seleccione uno"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
      <MarkdownEditor
        name="bio"
        label="Biografía"
        placeholder="Mi nombre es Juan Pérez..."
        disabled={isLoading}
        control={control}
        errors={errors}
        light
      />
      <MarkdownEditor
        name="proposals"
        label="Propuestas"
        placeholder="Ofrezco trabajar en..."
        disabled={isLoading}
        control={control}
        errors={errors}
        light
      />
    </div>
  );

  const actionsContent = (
    <Button
      label="Crear candidato"
      onClick={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );

  return <Card bodyContent={bodyContent} actionsContent={actionsContent} />;
};

export default NewCandidate;
