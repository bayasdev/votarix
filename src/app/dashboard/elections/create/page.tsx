import CreateElection from '@/src/components/dashboard/elections/CreateElection';
import Heading from '@/src/components/common/Heading';
import { getCandidates } from '@/src/app/actions/candidate';

const CreateElectionPage = async () => {
  const candidates = await getCandidates();

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Crear elección" />
      <CreateElection candidates={candidates} />
    </div>
  );
};

export default CreateElectionPage;
