import { getElectionResultsById } from '@/lib/data/election';
import ElectionResultsClient from '@/components/dashboard/elections/results/client';
import EmptyState from '@/components/empty-state';

interface ElectionResultsPageProps {
  params: {
    electionId?: string;
  };
}

const ElectionResultsPage = async ({ params }: ElectionResultsPageProps) => {
  const electionResults = await getElectionResultsById(params);
  return (
    <div className="flex flex-col gap-6">
      {electionResults?.positions.length ? (
        <ElectionResultsClient data={electionResults} />
      ) : (
        <EmptyState
          title="No hay dignidades"
          subtitle="Aún no se han agregado dignidades a esta elección"
          showGoBack
        />
      )}
    </div>
  );
};

export default ElectionResultsPage;
