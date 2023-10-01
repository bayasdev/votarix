'use client';

import { useCallback, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IoMdEye } from 'react-icons/io';

import { SafeParty } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';
import Button from '../../common/Button';

interface PartiesClientProps {
  parties: SafeParty[] | null;
}

const PartiesClient: React.FC<PartiesClientProps> = ({ parties }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleViewCandidates = useCallback(
    (id: string) => {
      router.push(`/dashboard/parties/${id}/candidates`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/parties/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/parties/${id}`)
        .then(() => {
          toast.success('Eliminado correctamente');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data);
        })
        .finally(() => setIsLoading(false));
    },
    [router],
  );

  const columnHelper = createColumnHelper<SafeParty>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('id', {
      id: 'candidates',
      header: () => 'Candidatos',
      cell: (props) => (
        <Button
          label="Lista de candidatos"
          icon={IoMdEye}
          color="secondary"
          onClick={() => handleViewCandidates(props.getValue())}
          disabled={isLoading}
        />
      ),
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => 'Acciones',
      cell: (props) => (
        <Actions
          onEdit={() => handleEdit(props.getValue())}
          onDelete={() => handleDelete(props.getValue())}
          disabled={isLoading}
        />
      ),
    }),
  ];

  return <Table columns={columns} data={parties} />;
};

export default PartiesClient;
