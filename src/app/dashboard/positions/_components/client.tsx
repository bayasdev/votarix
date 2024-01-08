import { columns } from '@/app/dashboard/positions/_components/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafePositionWithElection } from '@/types';

interface PositionsClientProps {
  positions: SafePositionWithElection[] | null;
}

const PositionsClient: React.FC<PositionsClientProps> = ({ positions }) => {
  return <DataTable columns={columns} data={positions} />;
};

export default PositionsClient;
