import CreateCandidate from '@/src/components/dashboard/candidates/CreateCandidate';
import Heading from '@/src/components/ui/Heading';

const CreateCandidatePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Crear candidato" />
      <CreateCandidate />
    </div>
  );
};

export default CreateCandidatePage;
