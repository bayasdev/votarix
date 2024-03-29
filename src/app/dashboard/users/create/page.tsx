import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import UserForm from '@/app/dashboard/users/_components/form';

const CreateUserPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Crear usuario"
          subtitle="Registre un nuevo usuario en el sistema"
        />
        <GoBack />
      </div>
      <UserForm />
    </div>
  );
};

export default CreateUserPage;
