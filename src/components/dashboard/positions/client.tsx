import { columns } from '@/components/dashboard/positions/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafePosition } from '@/types';

interface PositionsClientProps {
  positions: SafePosition[] | null;
}

const PositionsClient: React.FC<PositionsClientProps> = ({ positions }) => {
  return <DataTable columns={columns} data={positions} />;
};

export default PositionsClient;
