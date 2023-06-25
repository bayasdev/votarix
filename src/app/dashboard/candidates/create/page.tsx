import { getParties } from '@/src/app/actions/party';
import CreateCandidate from '@/src/components/dashboard/candidates/CreateCandidate';
import Heading from '@/src/components/common/Heading';

const CreateCandidatePage = async () => {
  const parties = await getParties();

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Crear candidato" />
      <CreateCandidate parties={parties} />
    </div>
  );
};

export default CreateCandidatePage;
