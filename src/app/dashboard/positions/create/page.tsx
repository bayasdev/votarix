import { getElections } from '@/actions/election';
import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import PositionForm from '@/components/dashboard/positions/form';

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
