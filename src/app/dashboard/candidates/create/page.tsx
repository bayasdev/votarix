import { getParties } from '@/app/actions/party';
import { getPositions } from '@/app/actions/position';
import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import CandidateForm from '@/components/dashboard/candidates/form';

const CreateCandidatePage = async () => {
  const parties = await getParties();
  const positions = await getPositions();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Crear candidato"
          subtitle="Registre un nuevo candidato en el sistema"
        />
        <GoBack />
      </div>
      <CandidateForm parties={parties} positions={positions} />
    </div>
  );
};

export default CreateCandidatePage;
