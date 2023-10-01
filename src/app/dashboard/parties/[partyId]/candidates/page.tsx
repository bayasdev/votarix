import { getCandidatesByPartyId } from '@/src/app/actions/candidate';
import { getPartyById } from '@/src/app/actions/party';
import EmptyState from '@/src/components/common/EmptyState';
import Heading from '@/src/components/common/Heading';
import CandidatesClient from '@/src/components/dashboard/candidates/CandidatesClient';
import GoBack from '@/src/components/dashboard/common/GoBack';

interface CandidatesByPartyPageProps {
  params: {
    partyId?: string;
  };
}

const CandidatesByPartyPage = async ({
  params,
}: CandidatesByPartyPageProps) => {
  const party = await getPartyById(params);
  const candidates = await getCandidatesByPartyId(params);

  if (!party)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title={`Candidatos de ${party?.name}`} />
      {candidates && candidates.length > 0 ? (
        <CandidatesClient candidates={candidates} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CandidatesByPartyPage;
