import CreateElection from '@/src/components/dashboard/elections/CreateElection';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';

const CreateElectionPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Crear elección" />
      <CreateElection />
    </div>
  );
};

export default CreateElectionPage;
