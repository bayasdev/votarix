import { getElectionById } from '@/src/app/actions/election';
import EmptyState from '@/src/components/common/EmptyState';
import EditElection from '@/src/components/dashboard/elections/EditElection';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';

interface EditElectionPageProps {
  params: {
    electionId?: string;
  };
}

const EditElectionPage = async ({ params }: EditElectionPageProps) => {
  const election = await getElectionById(params);

  if (!election)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Editar elección" />
      <EditElection election={election} />
    </div>
  );
};

export default EditElectionPage;
