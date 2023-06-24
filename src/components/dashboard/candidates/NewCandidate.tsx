'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import Card from '../../ui/Card';
import Input from '../../inputs/Input';
import Button from '../../ui/Button';
import Textarea from '../../inputs/Textarea';

const NewCandidate = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, 'El campo es requerido'),
    password: z.string().min(1, 'Ingrese una contraseña'),
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

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsLoading(true);
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
        {/* TODO: party select */}
        <Input
          id="partyId"
          label="Partido político"
          placeholder="Juan Pérez"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
      {/* TODO: should be markdown */}
      <Textarea
        id="proposals"
        label="Propuestas"
        disabled={isLoading}
        register={register}
        errors={errors}
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
