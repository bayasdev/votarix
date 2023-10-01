'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineAdd, MdOutlineRestore } from 'react-icons/md';
import dayjs from 'dayjs';

import { SafeCandidate, SafePosition } from '@/src/types';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Select from '../../common/Select';
import {
  ElectionRequest,
  ElectionValidator,
} from '@/src/lib/validators/election';
import Textarea from '../../common/Textarea';
import DateInput from '../../common/DateInput';

interface CreateElectionProps {
  candidates: SafeCandidate[] | null;
  positions: SafePosition[] | null;
}

const CreateElection: React.FC<CreateElectionProps> = ({ candidates }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const defaultStartTime = new Date();
  const defaultEndTime = dayjs(defaultStartTime).add(2, 'hour').toDate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ElectionRequest>({
    resolver: zodResolver(ElectionValidator),
    defaultValues: {
      name: '',
      description: '',
      startTime: defaultStartTime,
      endTime: defaultEndTime,
    },
  });

  const resetFields = () => {
    resetField('name');
    resetField('description');
    resetField('startTime');
    resetField('endTime');
  };

  const onSubmit: SubmitHandler<ElectionRequest> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/elections', data)
      .then(() => {
        toast.success('Creado correctamente');
        router.replace('/dashboard/elections');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const candidatesOptions = candidates?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Input
        id="name"
        label="Nombre"
        placeholder="Elecciones Generales 2023"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Textarea
        id="description"
        label="Descripción"
        placeholder="Elecciones para elegir al nuevo presidente de la república"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <div className="grid gap-2 md:grid-cols-2">
        <DateInput
          id="startTime"
          label="Fecha de inicio"
          disabled={isLoading}
          control={control}
          errors={errors}
        />
        <DateInput
          id="endTime"
          label="Fecha de finalización"
          disabled={isLoading}
          control={control}
          errors={errors}
        />
      </div>
      <div>Dignidades de elección popular</div>
    </div>
  );

  const actionsContent = (
    <div className="flex gap-2">
      <Button
        label="Crear elección"
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

export default CreateElection;
