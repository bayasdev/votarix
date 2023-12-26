import { getElections } from '@/lib/data/election';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import PositionForm from '@/app/dashboard/positions/_components/form';

const CreatePositionPage = async () => {
  const elections = await getElections();
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Crear dignidad"
          subtitle="Ingrese el nombre de la dignidad de elección popular"
        />
        <GoBack />
      </div>
      <PositionForm elections={elections} />
    </div>
  );
};

export default CreatePositionPage;
