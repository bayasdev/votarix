'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { SafeUser } from '@/types';
import AddVotersModal from '@/components/modals/add-voters-modal';
import { toast } from '@/components/ui/use-toast';

interface AddVotersProps {
  electionId?: string;
  elegibleVoters: SafeUser[] | null;
}

const AddVoters: React.FC<AddVotersProps> = ({
  electionId,
  elegibleVoters,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<SafeUser[]>([]);

  const handleManualUpload = () => {
    setIsLoading(true);

    // make an array of {id: string} from selectedData
    const selectedIds = selectedData.map((user) => ({ id: user.id }));

    axios
      .post(`/api/elections/${electionId}/voters/bulkConnect`, selectedIds)
      .then(() => {
        toast({
          title: 'Votante(s) agregado(s) correctamente',
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

  const handleFileUpload = () => {
    setIsLoading(true);
    setIsLoading(false);
  };
  return (
    <>
      <AddVotersModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleManualUpload={handleManualUpload}
        handleFileUpload={handleFileUpload}
        setSelectedData={setSelectedData}
        isLoading={isLoading}
        elegibleVoters={elegibleVoters}
      />
      <Button onClick={() => setIsOpen(true)}>Agregar votantes</Button>
    </>
  );
};

export default AddVoters;
