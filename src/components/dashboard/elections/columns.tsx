'use client';

import { SafeElection } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { DataTableColumnHeader } from '@/components/dashboard/data-table-column-header';
import CellActions from '@/components/dashboard/elections/cell-actions';

export const columns: ColumnDef<SafeElection>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de inicio" />
    ),
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.original.startTime).format('DD/MM/YYYY HH:mm')}</span>
      );
    },
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de finalización" />
    ),
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.original.endTime).format('DD/MM/YYYY HH:mm')}</span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
