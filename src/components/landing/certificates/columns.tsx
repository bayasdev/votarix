'use client';

import { CertificateResponse } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { FileDownIcon } from 'lucide-react';

export const columns: ColumnDef<CertificateResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Código',
  },
  {
    accessorKey: 'electionName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proceso electoral" />
    ),
  },
  {
    id: 'download',
    header: 'Descargar',
    cell: ({ row }) => {
      return (
        <Button>
          <FileDownIcon className="mr-2 h-4 w-4" />
          Descargar certificado
        </Button>
      );
    },
  },
];
