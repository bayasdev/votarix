'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { SafeElection, SafeUser, SafeUserWithHasVoted } from '@/types';
import Heading from '@/components/shared/heading';
import GoBack from '@/components/shared/go-back';
import EmptyState from '@/components/shared/empty-state';
import { columns } from '@/components/dashboard/elections/voters/columns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { toast } from '@/components/ui/use-toast';
import { UserPlusIcon, UserXIcon } from 'lucide-react';
import AlertModal from '@/components/modals/alert-modal';
import AddVotersModal from '@/components/modals/add-voters-modal';

interface VotersClientProps {
  election: SafeElection | null;
  voters: SafeUserWithHasVoted[] | null;
  elegibleVoters: SafeUser[] | null;
}

const VotersClient: React.FC<VotersClientProps> = ({
  election,
  voters,
  elegibleVoters,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // disconnect voters
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] =
    React.useState(false);
  const [disconnectRowSelection, setDisconnectRowSelection] = React.useState(
    {},
  );
  const [disconnectSelectedData, setDisconnectSelectedData] = React.useState<
    SafeUserWithHasVoted[]
  >([]);

  const handleVotersDisconnect = () => {
    setIsLoading(true);

    // make an array of {id: string} from selectedData
    const selectedIds = disconnectSelectedData.map((user) => ({ id: user.id }));

    axios
      .post(`/api/elections/${election?.id}/voters/bulkDisconnect`, selectedIds)
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
        setIsDisconnectModalOpen(false);
        setDisconnectRowSelection({});
      });
  };

  const selectActions = (
    <>
      {disconnectSelectedData.length > 0 && (
        <Button
          variant="destructive"
          onClick={() => setIsDisconnectModalOpen(true)}
        >
          <UserXIcon className="mr-2 h-4 w-4" />
          Eliminar votantes
        </Button>
      )}
    </>
  );

  // add voters

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isAddModalLoading, setIsAddModalLoading] = React.useState(false);
  const [addModalRowSelection, setAddModalRowSelection] = React.useState({});
  const [addModalSelectedData, setAddModalSelectedData] = React.useState<
    SafeUser[]
  >([]);

  const handleManualVotersUpload = () => {
    setIsAddModalLoading(true);

    // make an array of {id: string} from selectedData
    const selectedIds = addModalSelectedData.map((user) => ({ id: user.id }));

    axios
      .post(`/api/elections/${election?.id}/voters/bulkConnect`, selectedIds)
      .then(() => {
        toast({
          title: 'Votante(s) agregado(s) correctamente',
          description: `${selectedIds.length} registros`,
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
        setIsAddModalLoading(false);
        setAddModalRowSelection({});
        setIsAddModalOpen(false);
      });
  };

  const handleFileVotersUpload = (file: File | null) => {
    setIsAddModalLoading(true);

    if (!file || file.type !== 'text/csv') {
      toast({
        title: 'Ocurrió un error',
        description: 'El archivo debe ser de tipo CSV',
        variant: 'destructive',
      });
      setIsAddModalLoading(false);
      return;
    }

    axios
      .post(`/api/elections/${election?.id}/voters/bulkUpload`, file)
      .then((response) => {
        toast({
          title: 'Votante(s) agregado(s) correctamente',
          description: response?.data,
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
        setIsAddModalLoading(false);
        setIsAddModalOpen(false);
      });
  };

  return (
    <>
      <AlertModal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onConfirm={() => handleVotersDisconnect()}
        isLoading={isLoading}
      />
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Heading
            title="Padrón electoral"
            subtitle={`Administre los votantes de ${election?.name}`}
          />
          <div className="flex flex-wrap gap-4 lg:flex-col lg:items-end">
            <GoBack />
            <>
              <AddVotersModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                handleManualUpload={handleManualVotersUpload}
                handleFileUpload={handleFileVotersUpload}
                rowSelection={addModalRowSelection}
                setRowSelection={setAddModalRowSelection}
                setSelectedData={setAddModalSelectedData}
                isLoading={isAddModalLoading}
                elegibleVoters={elegibleVoters}
              />
              <Button onClick={() => setIsAddModalOpen(true)}>
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Agregar votantes
              </Button>
            </>
          </div>
        </div>
        {voters && voters.length > 0 ? (
          <DataTable
            columns={columns}
            data={voters}
            rowSelection={disconnectRowSelection}
            setRowSelection={setDisconnectRowSelection}
            onSelectedRowsChange={setDisconnectSelectedData}
            showRowSelection
            selectActions={selectActions}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};

export default VotersClient;
