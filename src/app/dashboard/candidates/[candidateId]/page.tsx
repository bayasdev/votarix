import { getCandidateById } from '@/src/app/actions/candidate';
import { getParties } from '@/src/app/actions/party';
import EmptyState from '@/src/components/common/EmptyState';
import EditCandidate from '@/src/components/dashboard/candidates/EditCandidate';
import Heading from '@/src/components/common/Heading';

interface EditCandidatePageProps {
  params: {
    candidateId?: string;
  };
}

const EditCandidatePage = async ({ params }: EditCandidatePageProps) => {
  const candidate = await getCandidateById(params);
  const parties = await getParties();

  if (!candidate)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Editar candidato" />
      <EditCandidate candidate={candidate} parties={parties} />
    </div>
  );
};

export default EditCandidatePage;
