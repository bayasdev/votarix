import { notFound } from 'next/navigation';

import { getElectionById } from '@/lib/data/elections';
import {
  getElegibleVotersByElectionId,
  getVotersByElectionId,
} from '@/lib/data/voters';
import VotersClient from '@/app/dashboard/elections/[electionId]/voters/_components/client';

interface ElectionVotersPageProps {
  params: {
    electionId?: string;
  };
}

const ElectionVotersPage = async ({ params }: ElectionVotersPageProps) => {
  const election = await getElectionById(params);
  const voters = await getVotersByElectionId(params);
  const elegibleVoters = await getElegibleVotersByElectionId(params);

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
