import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import getCandidates from '../../actions/getCandidates';
import Heading from '@/src/components/ui/Heading';
import CandidatesClient from '@/src/components/dashboard/candidates/CandidatesClient';
import EmptyState from '@/src/components/EmptyState';

const CandidatesPage = async () => {
  const candidates = await getCandidates();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading title="Candidatos" subtitle="Administrar candidatos" />
        <Link href="/dashboard/candidates/new" className="btn-primary btn">
          <MdOutlineAdd size={20} />
          Agregar
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
