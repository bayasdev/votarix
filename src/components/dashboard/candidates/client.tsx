import { columns } from '@/components/dashboard/candidates/columns';
import { DataTable } from '@/components/dashboard/data-table';
import { SafeCandidate } from '@/types';

interface CandidatesClientProps {
  candidates: SafeCandidate[] | null;
}

const CandidatesClient: React.FC<CandidatesClientProps> = ({ candidates }) => {
  return <DataTable columns={columns} data={candidates} />;
};

export default CandidatesClient;
