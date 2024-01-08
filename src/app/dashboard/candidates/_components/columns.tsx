'use client';

import { CandidateType } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { SafeCandidateWithPartyAndPositionAndElection } from '@/types';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/app/dashboard/candidates/_components/cell-actions';
import { UserAvatar } from '@/components/shared/user-avatar';

export const columns: ColumnDef<SafeCandidateWithPartyAndPositionAndElection>[] =
  [
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
      accessorKey: 'document',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cédula" />
      ),
    },
    {
      accessorKey: 'partyName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Partido" />
      ),
      cell: ({ row }) => {
        return <span>{row.original.partyName}</span>;
      },
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
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => {
        return (
          <span>
            {row.original.type === CandidateType.PRIMARY
              ? 'Principal'
              : 'Alterno'}
          </span>
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
