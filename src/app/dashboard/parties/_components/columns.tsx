'use client';

import { SafePartyWithPositionAndElection } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/app/dashboard/parties/_components/cell-actions';
import { UserAvatar } from '@/components/shared/user-avatar';

export const columns: ColumnDef<SafePartyWithPositionAndElection>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Logo',
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
    accessorKey: 'positionName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dignidad" />
    ),
    cell: ({ row }) => {
      return <span>{row.original.positionName}</span>;
    },
  },
  {
    accessorKey: 'electionName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Elección" />
    ),
    cell: ({ row }) => {
      return <span>{row.original.electionName}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
