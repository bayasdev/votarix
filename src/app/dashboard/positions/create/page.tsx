import CreatePosition from '@/src/components/dashboard/positions/CreatePosition';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';
import { getElections } from '@/src/app/actions/election';

const CreatePositionPage = async () => {
  const elections = await getElections();

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Crear puesto electivo" />
      <CreatePosition elections={elections} />
    </div>
  );
};

export default CreatePositionPage;
