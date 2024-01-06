import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import { getPositionsWithElection } from '@/lib/data/positions';
import PartyForm from '@/app/dashboard/parties/_components/form';

const CreatePartyPage = async () => {
  const positions = await getPositionsWithElection();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Crear partido político"
          subtitle="Ingrese los datos del partido político"
        />
        <GoBack />
      </div>
      <PartyForm positions={positions} />
    </div>
  );
};

export default CreatePartyPage;
