import { columns } from '@/components/dashboard/candidates/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeCandidate } from '@/types';

interface CandidatesClientProps {
  candidates: SafeCandidate[] | null;
}

const CandidatesClient: React.FC<CandidatesClientProps> = ({ candidates }) => {
  return <DataTable columns={columns} data={candidates} />;
};

export default CandidatesClient;
