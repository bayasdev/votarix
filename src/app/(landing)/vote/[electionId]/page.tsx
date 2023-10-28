import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getElectionDataById } from '@/actions/election';
import VoteForm from '@/components/landing/vote/form';
import { getCanUserVote } from '@/actions/voters';
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';

interface VotePageProps {
  params: {
    electionId: string;
  };
}

export const metadata: Metadata = {
  title: 'Votar',
};

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
      {electionData?.positions.length ? (
        <>
          <Heading
            title={electionData.name}
            subtitle={electionData.description}
            center
          />
          <VoteForm electionData={electionData} />
        </>
      ) : (
        <EmptyState
          title="No hay dignidades en esta elección"
          subtitle="Intenta más tarde"
          icon="notFound"
          showGoBack
        />
      )}
    </div>
  );
};

export default VotePage;
