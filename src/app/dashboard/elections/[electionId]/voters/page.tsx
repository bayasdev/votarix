import { notFound } from 'next/navigation';

import { getElectionById } from '@/app/actions/election';
import { getElegibleVoters, getVotersByElectionId } from '@/app/actions/voters';
import Heading from '@/components/heading';
import EmptyState from '@/components/empty-state';
import AddVoters from '@/components/dashboard/elections/voters/add-voters';
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
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Padrón electoral"
          subtitle={`Administre los votantes de ${election.name}`}
        />
        <AddVoters electionId={election.id} elegibleVoters={elegibleVoters} />
      </div>
      {voters && voters.length > 0 ? (
        <VotersClient electionId={election.id} voters={voters} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ElectionVotersPage;
