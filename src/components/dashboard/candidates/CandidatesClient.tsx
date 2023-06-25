'use client';

import { useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeCandidate } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';

interface CandidatesClientProps {
  candidates: SafeCandidate[] | null;
}

const CandidatesClient: React.FC<CandidatesClientProps> = ({ candidates }) => {
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
          toast.success('Candidato eliminado!');
          router.refresh();
        })
        .catch(() => {
          toast.error('Algo salió mal!');
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

export default CandidatesClient;
