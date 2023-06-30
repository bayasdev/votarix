import CreateUser from '@/src/components/dashboard/users/CreateUser';
import Heading from '@/src/components/common/Heading';

const CreateUserPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Crear usuario" />
      <CreateUser />
    </div>
  );
};

export default CreateUserPage;
