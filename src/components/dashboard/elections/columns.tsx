'use client';

import { SafeElection } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/components/dashboard/elections/cell-actions';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UserCheckIcon } from 'lucide-react';

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
    id: 'voters',
    header: 'Votantes',
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/elections/${row.original.id}/voters`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          <UserCheckIcon className="mr-2 h-4 w-4" />
          Padrón electoral
        </Link>
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
