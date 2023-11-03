import { notFound } from 'next/navigation';

import { getElectionById } from '@/lib/data/election';
import { getElegibleVoters, getVotersByElectionId } from '@/lib/data/voters';
import VotersClient from '@/components/dashboard/elections/voters/client';

interface ElectionVotersPageProps {
  params: {
    electionId?: string;
  };
}

const ElectionVotersPage = async ({ params }: ElectionVotersPageProps) => {
  const election = await getElectionById(params);
  const voters = await getVotersByElectionId(params);
  const elegibleVoters = await getElegibleVoters(params);

  if (!election) return notFound();

  return (
    <VotersClient
      election={election}
      voters={voters}
      elegibleVoters={elegibleVoters}
    />
  );
};

export default ElectionVotersPage;
