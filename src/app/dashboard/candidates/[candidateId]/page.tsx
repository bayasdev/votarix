import getCandidateById from '@/src/app/actions/getCandidateById';
import EmptyState from '@/src/components/EmptyState';
import EditCandidate from '@/src/components/dashboard/candidates/EditCandidate';
import Heading from '@/src/components/ui/Heading';

interface EditCandidatePageProps {
  params: {
    candidateId?: string;
  };
}

const EditCandidatePage = async ({ params }: EditCandidatePageProps) => {
  const candidate = await getCandidateById(params);

  if (!candidate)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Editar candidato" />
      <EditCandidate candidate={candidate} />
    </div>
  );
};

export default EditCandidatePage;
