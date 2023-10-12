'use client';

import { SafeUser } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/components/dashboard/users/cell-actions';

export const columns: ColumnDef<SafeUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electrónico" />
    ),
  },
  {
    accessorKey: 'document',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cédula" />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
