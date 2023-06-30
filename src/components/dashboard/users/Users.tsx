'use client';

import { useCallback, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/src/types';
import Table from '../../common/Table';
import Actions from '../common/Actions';

interface UsersProps {
  users: SafeUser[] | null;
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/dashboard/users/${id}`);
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/users/${id}`)
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

  const columnHelper = createColumnHelper<SafeUser>();

  const roleMap = {
    ADMIN: 'Administrator',
    VOTER: 'Votante',
  };

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
    columnHelper.accessor('role', {
      header: () => 'Rol',
      cell: (props) => <>{roleMap[props.getValue()]}</>,
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

  return <Table columns={columns} data={users} />;
};

export default Users;
