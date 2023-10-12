'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { SafeUser } from '@/types';
import { columns } from '@/components/dashboard/elections/voters/columns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { UserXIcon } from 'lucide-react';

interface VotersClientProps {
  electionId?: string;
  voters: SafeUser[] | null;
}

const VotersClient: React.FC<VotersClientProps> = ({ electionId, voters }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<SafeUser[]>([]);

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
      });
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={voters}
        onSelectedRowsChange={setSelectedData}
        showRowSelection
      />
      {selectedData.length > 0 && (
        <Button variant="destructive" onClick={handleDisconnect}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UserXIcon className="mr-2 h-4 w-4" />
          )}
          Eliminar votantes
        </Button>
      )}
    </div>
  );
};

export default VotersClient;
