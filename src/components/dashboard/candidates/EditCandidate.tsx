'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MdOutlineEdit, MdOutlineRestore } from 'react-icons/md';

import { SafeCandidate, SafeParty } from '@/src/types';
import Card from '../../common/Card';
import Input from '../../common/Input';
import Button from '../../common/Button';
import MarkdownEditor from '../../common/MarkdownEditor';
import Select from '../../common/Select';
import {
  CandidateRequest,
  CandidateValidator,
} from '@/src/lib/validators/candidate';

interface EditCandidateProps {
  candidate: SafeCandidate | null;
  parties: SafeParty[] | null;
}

const EditCandidate: React.FC<EditCandidateProps> = ({
  candidate,
  parties,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<CandidateRequest>({
    resolver: zodResolver(CandidateValidator),
    defaultValues: {
      name: candidate?.name || '',
      email: candidate?.email || '',
      document: candidate?.document || '',
      partyId: candidate?.partyId || '',
      bio: candidate?.bio || '',
      proposals: candidate?.proposals || '',
    },
  });

  const resetFields = () => {
    resetField('name');
    resetField('email');
    resetField('document');
    resetField('bio');
    resetField('proposals');
  };

  const onSubmit: SubmitHandler<CandidateRequest> = (data) => {
    setIsLoading(true);
    axios
      .put(`/api/candidates/${candidate?.id}`, data)
      .then(() => {
        toast.success('Editado correctamente');
        // fix stale data
        router.replace('/dashboard/candidates');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const partiesOptions = parties?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

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
          options={partiesOptions}
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
    <div className="flex gap-2">
      <Button
        label="Editar candidato"
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

export default EditCandidate;
