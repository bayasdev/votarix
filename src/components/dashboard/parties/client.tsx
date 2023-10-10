import { columns } from '@/components/dashboard/parties/columns';
import { DataTable } from '@/components/dashboard/data-table';
import { SafeParty } from '@/types';

interface PartysClientProps {
  parties: SafeParty[] | null;
}

const PartysClient: React.FC<PartysClientProps> = ({ parties }) => {
  return <DataTable columns={columns} data={parties} />;
};

export default PartysClient;
