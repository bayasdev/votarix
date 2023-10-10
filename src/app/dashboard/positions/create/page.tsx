import { getElections } from '@/app/actions/election';
import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import PositionForm from '@/components/dashboard/positions/form';

const CreatePositionPage = async () => {
  const elections = await getElections();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
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
