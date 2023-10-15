import { getElectionResultsById } from '@/app/actions/election';

interface ElectionResultsPageProps {
  params: {
    electionId?: string;
  };
}

const ElectionResultsPage = async ({ params }: ElectionResultsPageProps) => {
  const electionResults = await getElectionResultsById(params);
  return (
    <div>
      ElectionResultsPage
      <pre>{JSON.stringify(electionResults, null, 2)}</pre>
    </div>
  );
};

export default ElectionResultsPage;
