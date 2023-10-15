import { notFound } from 'next/navigation';

import { getElectionDataById } from '@/app/actions/election';
import VoteClient from '@/components/landing/vote/client';
import { getCanUserVote } from '@/app/actions/voters';
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';

interface VotePageProps {
  params: {
    electionId: string;
  };
}

const VotePage = async ({ params }: VotePageProps) => {
  const canUserVote = await getCanUserVote(params);

  if (!canUserVote)
    return (
      <EmptyState
        title="Acceso denegado"
        subtitle="Usted ya votó o no tiene permitido participar en esta elección"
        icon="warning"
        showGoBack
      />
    );

  const electionData = await getElectionDataById(params);

  if (!electionData) return notFound();

  return (
    <div className="container flex flex-col gap-12">
      <Heading
        title={electionData.name}
        subtitle={electionData.description}
        center
      />
      <VoteClient electionData={electionData} />
    </div>
  );
};

export default VotePage;
