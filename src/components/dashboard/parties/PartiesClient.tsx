'use client';

import { useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeParty } from '@/src/types';
import Table from '../../ui/table/Table';
import TableActions from '../../ui/table/TableActions';

interface PartiesClientProps {
  parties: SafeParty[] | null;
}

const PartiesClient: React.FC<PartiesClientProps> = ({ parties }) => {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/parties/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/parties/${id}`)
        .then(() => {
          toast.success('Partido eliminado!');
          router.refresh();
        })
        .catch((error) => {
          toast.error('Algo salió mal!');
        });
    },
    [router],
  );

  const columnHelper = createColumnHelper<SafeParty>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => 'Acciones',
      cell: (props) => (
        <TableActions
          onEdit={() => handleEdit(props.getValue())}
          onDelete={() => handleDelete(props.getValue())}
        />
      ),
    }),
  ];

  return <Table columns={columns} data={parties} />;
};

export default PartiesClient;
