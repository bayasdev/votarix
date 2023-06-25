'use client';

import { useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeCandidate } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';

interface CandidatesProps {
  candidates: SafeCandidate[] | null;
}

const Candidates: React.FC<CandidatesProps> = ({ candidates }) => {
  const router = useRouter();

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/candidates/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/candidates/${id}`)
        .then(() => {
          toast.success('Eliminado correctamente');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data);
        });
    },
    [router],
  );

  const columnHelper = createColumnHelper<SafeCandidate>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('document', {
      header: () => 'Cédula',
    }),
    columnHelper.accessor('email', {
      header: () => 'Correo electrónico',
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => 'Acciones',
      cell: (props) => (
        <Actions
          onEdit={() => handleEdit(props.getValue())}
          onDelete={() => handleDelete(props.getValue())}
        />
      ),
    }),
  ];

  return <Table columns={columns} data={candidates} />;
};

export default Candidates;
