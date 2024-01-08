import { columns } from '@/app/dashboard/elections/_components/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeElection } from '@/types';

interface ElectionsClientProps {
  elections: SafeElection[] | null;
}

const ElectionsClient: React.FC<ElectionsClientProps> = ({ elections }) => {
  return <DataTable columns={columns} data={elections} />;
};

export default ElectionsClient;
