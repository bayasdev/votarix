'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { SafeUserWithHasVoted } from '@/types';
import { columns } from '@/components/dashboard/elections/voters/columns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { toast } from '@/components/ui/use-toast';
import { UserXIcon } from 'lucide-react';
import AlertModal from '@/components/modals/alert-modal';

interface VotersClientProps {
  electionId?: string;
  voters: SafeUserWithHasVoted[] | null;
}

const VotersClient: React.FC<VotersClientProps> = ({ electionId, voters }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedData, setSelectedData] = React.useState<
    SafeUserWithHasVoted[]
  >([]);

  const handleDisconnect = () => {
    setIsLoading(true);

    // make an array of {id: string} from selectedData
    const selectedIds = selectedData.map((user) => ({ id: user.id }));

    axios
      .post(`/api/elections/${electionId}/voters/bulkDisconnect`, selectedIds)
      .then(() => {
        toast({
          title: 'Votante(s) removido(s) correctamente',
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
        setRowSelection({});
      });
  };

  const selectActions = (
    <>
      {selectedData.length > 0 && (
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          <UserXIcon className="mr-2 h-4 w-4" />
          Eliminar votantes
        </Button>
      )}
    </>
  );

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDisconnect()}
        isLoading={isLoading}
      />
      <DataTable
        columns={columns}
        data={voters}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        onSelectedRowsChange={setSelectedData}
        showRowSelection
        selectActions={selectActions}
      />
    </>
  );
};

export default VotersClient;
