import getCandidateById from '@/src/app/actions/getCandidateById';
import EmptyState from '@/src/components/EmptyState';
import EditCandidate from '@/src/components/dashboard/candidates/EditCandidate';
import NewCandidate from '@/src/components/dashboard/candidates/NewCandidate';
import Heading from '@/src/components/ui/Heading';

const NewCandidatePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Crear candidato" />
      <NewCandidate />
    </div>
  );
};

export default NewCandidatePage;
