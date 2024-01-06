'use client';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { SafeAuditLog } from '@/types';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

export const columns: ColumnDef<SafeAuditLog>[] = [
  {
    accessorKey: 'userEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
  },
  {
    accessorKey: 'userRole',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
  },
  {
    accessorKey: 'action',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acción" />
    ),
  },
  {
    accessorKey: 'entityName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recurso afectado" />
    ),
  },
  {
    accessorKey: 'entityId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID del recurso" />
    ),
  },
  {
    accessorKey: 'entityType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de recurso" />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.original.createdAt).format('DD/MM/YYYY HH:mm')}</span>
      );
    },
  },
];
