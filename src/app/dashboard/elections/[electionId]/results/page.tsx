import { notFound } from 'next/navigation';

import { getElectionResultsById } from '@/lib/data/elections';
import ElectionResultsClient from '@/app/dashboard/elections/[electionId]/results/_components/client';

interface ElectionResultsPageProps {
  params: {
    electionId?: string;
  };
}

const ElectionResultsPage = async ({ params }: ElectionResultsPageProps) => {
  const electionResults = await getElectionResultsById(params);

  if (!electionResults) return notFound();

  return (
    <div className="flex flex-col gap-6">
      <ElectionResultsClient data={electionResults} />
    </div>
  );
};

export default ElectionResultsPage;
