import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import { getCandidates } from '../../actions/candidate';
import Candidates from '@/src/components/dashboard/candidates/Candidates';
import Heading from '@/src/components/common/Heading';
import EmptyState from '@/src/components/common/EmptyState';

const CandidatesPage = async () => {
  const candidates = await getCandidates();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading title="Candidatos" subtitle="Administrar candidatos" />
        <Link href="/dashboard/candidates/create" className="btn-primary btn">
          <MdOutlineAdd size={20} />
          Crear
        </Link>
      </div>
      {candidates && candidates.length > 0 ? (
        <Candidates candidates={candidates} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CandidatesPage;
