'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineEdit, MdOutlineRestore } from 'react-icons/md';

import { SafeElection, SafePosition } from '@/src/types';
import {
  PositionRequest,
  PositionValidator,
} from '@/src/lib/validators/position';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Select from '../../common/Select';

interface EditPositionProps {
  position: SafePosition | null;
  elections: SafeElection[] | null;
}

const EditPosition: React.FC<EditPositionProps> = ({ position, elections }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<PositionRequest>({
    resolver: zodResolver(PositionValidator),
    defaultValues: {
      name: position?.name || '',
      electionId: position?.electionId || '',
    },
  });

  const resetFields = () => {
    resetField('name');
    resetField('electionId');
  };

  const onSubmit: SubmitHandler<PositionRequest> = (data) => {
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

  const electionsOptions = elections?.map((election) => ({
    label: election.name,
    value: election.id,
  }));

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
      <Select
        id="electionId"
        label="Elección"
        placeholder="Seleccione una elección"
        options={electionsOptions}
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
