import CreateParty from '@/src/components/dashboard/parties/CreateParty';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';

const CreatePartyPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Crear partido político" />
      <CreateParty />
    </div>
  );
};

export default CreatePartyPage;
