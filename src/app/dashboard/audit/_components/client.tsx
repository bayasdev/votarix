import { columns } from '@/app/dashboard/audit/_components/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeAuditLog } from '@/types';

interface PositionsClientProps {
  logs: SafeAuditLog[] | null;
}

const PositionsClient: React.FC<PositionsClientProps> = ({ logs }) => {
  return <DataTable columns={columns} data={logs} searchKey="userEmail" />;
};

export default PositionsClient;
