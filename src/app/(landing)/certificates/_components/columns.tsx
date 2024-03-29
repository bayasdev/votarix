'use client';

import { CertificateResponse } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { saveAs } from 'file-saver';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const downloadCertificate = (id: string) => {
  axios
    .get(`/api/certificates/${id}`, { responseType: 'blob' })
    .then((response) => {
      saveAs(response.data, `certificado_${id}.pdf`);
    })
    .catch((error) => {
      toast({
        title: 'Ocurrió un error',
        description: error?.response?.data,
      });
    });
};

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
        <Button onClick={() => downloadCertificate(row.original.id)}>
          <FileDown className="mr-2 h-4 w-4" />
          Descargar certificado
        </Button>
      );
    },
  },
];
