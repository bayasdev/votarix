import { getCandidateById } from '@/src/app/actions/candidate';
import { getParties } from '@/src/app/actions/party';
import EmptyState from '@/src/components/common/EmptyState';
import EditCandidate from '@/src/components/dashboard/candidates/EditCandidate';
import Heading from '@/src/components/common/Heading';
import { getPositions } from '@/src/app/actions/position';
import GoBack from '@/src/components/dashboard/common/GoBack';

interface EditCandidatePageProps {
  params: {
    candidateId?: string;
  };
}

const EditCandidatePage = async ({ params }: EditCandidatePageProps) => {
  const candidate = await getCandidateById(params);
  const parties = await getParties();
  const positions = await getPositions();

  if (!candidate)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Editar candidato" />
      <EditCandidate
        candidate={candidate}
        parties={parties}
        positions={positions}
      />
    </div>
  );
};

export default EditCandidatePage;
