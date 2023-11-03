import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import PartyForm from '@/components/dashboard/parties/form';

const CreatePartyPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
