import { getParties } from '@/lib/data/parties';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import CandidateForm from '@/app/dashboard/candidates/_components/form';

const CreateCandidatePage = async () => {
  const parties = await getParties();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Crear candidato"
          subtitle="Registre un nuevo candidato en el sistema"
        />
        <GoBack />
      </div>
      <CandidateForm parties={parties} />
    </div>
  );
};

export default CreateCandidatePage;
