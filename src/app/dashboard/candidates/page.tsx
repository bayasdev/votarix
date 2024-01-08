import Link from 'next/link';

import { getCandidatesWithPartyAndPositionAndElection } from '@/lib/data/candidates';
import CandidatesClient from '@/app/dashboard/candidates/_components/client';
import Heading from '@/components/shared/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import EmptyState from '@/components/shared/empty-state';

const CandidatesPage = async () => {
  const candidates = await getCandidatesWithPartyAndPositionAndElection();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading title="Candidatos" subtitle="Administrar candidatos" />
        <Link
          href="/dashboard/candidates/create"
          className={cn(buttonVariants())}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Crear candidato
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
