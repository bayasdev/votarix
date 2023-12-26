import { getElectionDataWithProposalsById } from '@/lib/data/election';
import { notFound } from 'next/navigation';

interface CandidatesByElectionProps {
  params: {
    electionId: string;
  };
}

const CandidatesByElection: React.FC<CandidatesByElectionProps> = async ({
  params,
}) => {
  const data = await getElectionDataWithProposalsById(params);
  if (!data) return notFound();

  return (
    <div>
      CandidatesByElection
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CandidatesByElection;
