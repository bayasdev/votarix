'use client';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { SafeElectionWithStatus } from '@/types';
import { ElectionStatus } from '@/constants';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/app/dashboard/elections/_components/cell-actions';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { BarChartBig, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<SafeElectionWithStatus>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: 'startsAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de inicio" />
    ),
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.original.startsAt).format('DD/MM/YYYY HH:mm')}</span>
      );
    },
  },
  {
    accessorKey: 'endsAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de finalización" />
    ),
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.original.endsAt).format('DD/MM/YYYY HH:mm')}</span>
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
        // display No iniciada, En curso, Finalizada
        <Badge
          variant={
            row.original.status === ElectionStatus.ONGOING
              ? 'default'
              : row.original.status === ElectionStatus.NOT_STARTED
                ? 'secondary'
                : 'destructive'
          }
        >
          {row.original.status === ElectionStatus.ONGOING
            ? 'En curso'
            : row.original.status === ElectionStatus.NOT_STARTED
              ? 'No iniciada'
              : 'Finalizada'}
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
          <UserCheck className="mr-2 h-4 w-4" />
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
          <BarChartBig className="mr-2 h-4 w-4" />
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
