'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CopyIcon, MoreHorizontal, PencilIcon, Trash2Icon } from 'lucide-react';
import axios from 'axios';

import { SafeElectionWithStatus } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AlertModal from '@/components/modals/alert-modal';
import { toast } from '@/components/ui/use-toast';

interface CellActionsProps {
  data: SafeElectionWithStatus;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(data.id);
    toast({
      description: 'Id copiado al portapapeles',
    });
  };

  const handleUpdate = () => {
    router.push(`/dashboard/elections/${data.id}`);
  };

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`/api/elections/${data.id}`)
      .then(() => {
        toast({
          title: 'Eliminado correctamente',
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error',
          description: error?.response?.data,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDelete()}
        isLoading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleCopy()}>
            <CopyIcon className="mr-2 h-4 w-4" />
            Copiar Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleUpdate()}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
