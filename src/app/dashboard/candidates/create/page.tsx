import { getParties } from '@/src/app/actions/party';
import CreateCandidate from '@/src/components/dashboard/candidates/CreateCandidate';
import Heading from '@/src/components/common/Heading';
import { getPositions } from '@/src/app/actions/position';
import GoBack from '@/src/components/dashboard/common/GoBack';

const CreateCandidatePage = async () => {
  const parties = await getParties();
  const positions = await getPositions();

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Crear candidato" />
      <CreateCandidate parties={parties} positions={positions} />
    </div>
  );
};

export default CreateCandidatePage;
