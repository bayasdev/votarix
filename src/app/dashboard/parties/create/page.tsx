import CreateParty from '@/src/components/dashboard/parties/CreateParty';
import Heading from '@/src/components/ui/Heading';

const CreatePartyPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Crear partido político" />
      <CreateParty />
    </div>
  );
};

export default CreatePartyPage;
