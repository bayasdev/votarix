import CreateUser from '@/src/components/dashboard/users/CreateUser';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';

const CreateUserPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Crear usuario" />
      <CreateUser />
    </div>
  );
};

export default CreateUserPage;
