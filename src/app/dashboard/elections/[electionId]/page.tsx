import { notFound } from 'next/navigation';

import { getElectionById } from '@/lib/data/election';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import ElectionForm from '@/app/dashboard/elections/_components/form';

interface UpdateElectionPageProps {
  params: {
    electionId?: string;
  };
}

const UpdateElectionPage = async ({ params }: UpdateElectionPageProps) => {
  const election = await getElectionById(params);
  if (!election) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Editar elección"
          subtitle="Actualice un proceso electoral existente"
        />
        <GoBack />
      </div>
      <ElectionForm initialData={election} />
    </div>
  );
};

export default UpdateElectionPage;
