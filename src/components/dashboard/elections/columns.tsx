'use client';

import { SafeElectionWithStatus } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/components/dashboard/elections/cell-actions';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { BarChartBigIcon, UserCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<SafeElectionWithStatus>[] = [
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
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status ? 'default' : 'secondary'}>
          {row.original.status ? 'Activa' : 'Inactiva'}
        </Badge>
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
    id: 'results',
    header: 'Resultados',
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/elections/${row.original.id}/results`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          <BarChartBigIcon className="mr-2 h-4 w-4" />
          Visualizar
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
