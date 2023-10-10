import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import PartyForm from '@/components/dashboard/parties/form';

const CreatePartyPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Crear partido político"
          subtitle="Ingrese los datos del partido político"
        />
        <GoBack />
      </div>
      <PartyForm />
    </div>
  );
};

export default CreatePartyPage;
