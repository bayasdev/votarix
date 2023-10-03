'use client';

import { useCallback, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IoMdEye } from 'react-icons/io';

import { SafePosition, SafePositionWithElection } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';
import Button from '../../common/Button';

interface PositionsClientProps {
  positions: SafePosition[] | SafePositionWithElection[] | null;
  showElection?: boolean;
}

const PositionsClient: React.FC<PositionsClientProps> = ({
  positions,
  showElection = false,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleViewCandidates = useCallback(
    (id: string) => {
      router.push(`/dashboard/positions/${id}/candidates`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/positions/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/positions/${id}`)
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

  const columnHelper = createColumnHelper<SafePositionWithElection>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('election.name', {
      id: 'election',
      header: () => 'Elección',
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

  const columnVisibility = {
    election: showElection,
  };

  return (
    <Table
      columns={columns}
      data={positions}
      columnVisibility={columnVisibility}
    />
  );
};

export default PositionsClient;
