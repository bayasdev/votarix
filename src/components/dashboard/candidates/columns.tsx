'use client';

import { SafeCandidateWithParty } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/dashboard/data-table-column-header';
import CellActions from '@/components/dashboard/candidates/cell-actions';
import { UserAvatar } from '@/components/user-avatar';

export const columns: ColumnDef<SafeCandidateWithParty>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Foto',
    cell: ({ row }) => {
      return (
        <UserAvatar
          name={row.original.name}
          imageUrl={row.original.imageUrl}
          className="h-8 w-8"
        />
      );
    },
  },
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
    accessorKey: 'party',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Partido" />
    ),
    cell: ({ row }) => {
      return <span>{row.original.party?.name ?? 'Sin partido'}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
