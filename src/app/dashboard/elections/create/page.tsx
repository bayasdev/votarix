import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import ElectionForm from '@/app/dashboard/elections/_components/form';

const CreateElectionPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Crear elección"
          subtitle="Registre un nuevo proceso electoral en el sistema"
        />
        <GoBack />
      </div>
      <ElectionForm />
    </div>
  );
};

export default CreateElectionPage;
