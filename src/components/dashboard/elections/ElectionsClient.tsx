'use client';

import { useCallback, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeElection } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';

interface ElectionsClientProps {
  elections: SafeElection[] | null;
}

const ElectionsClient: React.FC<ElectionsClientProps> = ({ elections }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/elections/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/elections/${id}`)
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

  const columnHelper = createColumnHelper<SafeElection>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('startTime', {
      header: () => 'Inicio',
    }),
    columnHelper.accessor('endTime', {
      header: () => 'Finalización',
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

  return <Table columns={columns} data={elections} />;
};

export default ElectionsClient;
