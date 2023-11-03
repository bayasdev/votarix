'use client';

import { SafeParty } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import CellActions from '@/components/dashboard/parties/cell-actions';
import { UserAvatar } from '@/components/shared/user-avatar';

export const columns: ColumnDef<SafeParty>[] = [
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
    id: 'actions',
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
