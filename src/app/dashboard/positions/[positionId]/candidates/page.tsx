import { getCandidatesByPositionId } from '@/src/app/actions/candidate';
import { getPositionById } from '@/src/app/actions/position';
import EmptyState from '@/src/components/common/EmptyState';
import Heading from '@/src/components/common/Heading';
import CandidatesClient from '@/src/components/dashboard/candidates/CandidatesClient';
import GoBack from '@/src/components/dashboard/common/GoBack';

interface CandidatesByPositionPageProps {
  params: {
    positionId?: string;
  };
}

const CandidatesByPositionPage = async ({
  params,
}: CandidatesByPositionPageProps) => {
  const position = await getPositionById(params);
  const candidates = await getCandidatesByPositionId(params);

  if (!position)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title={`Candidatos a ${position?.name}`} />
      {candidates && candidates.length > 0 ? (
        <CandidatesClient candidates={candidates} showParty />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CandidatesByPositionPage;
