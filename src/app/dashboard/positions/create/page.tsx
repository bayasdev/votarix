import CreatePosition from '@/src/components/dashboard/positions/CreatePosition';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';

const CreatePositionPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Crear puesto electivo" />
      <CreatePosition />
    </div>
  );
};

export default CreatePositionPage;
