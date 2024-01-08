'use client';

import { SafePositionWithElection } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/app/dashboard/positions/_components/cell-actions';

export const columns: ColumnDef<SafePositionWithElection>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'election',
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
