import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import { getCandidates } from '../../actions/candidate';
import CandidatesClient from '@/src/components/dashboard/candidates/CandidatesClient';
import Heading from '@/src/components/common/Heading';
import EmptyState from '@/src/components/common/EmptyState';

const CandidatesPage = async () => {
  const candidates = await getCandidates();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading title="Candidatos" subtitle="Administrar candidatos" />
        <Link href="/dashboard/candidates/create" className="btn btn-primary">
          <MdOutlineAdd size={20} />
          Crear
        </Link>
      </div>
      {candidates && candidates.length > 0 ? (
        <CandidatesClient candidates={candidates} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CandidatesPage;
