import { columns } from '@/app/dashboard/parties/_components/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafePartyWithPositionAndElection } from '@/types';

interface PartysClientProps {
  parties: SafePartyWithPositionAndElection[] | null;
}

const PartysClient: React.FC<PartysClientProps> = ({ parties }) => {
  return <DataTable columns={columns} data={parties} />;
};

export default PartysClient;
