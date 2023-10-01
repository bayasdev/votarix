import { getUserById } from '@/src/app/actions/user';
import EmptyState from '@/src/components/common/EmptyState';
import EditUser from '@/src/components/dashboard/users/EditUser';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';

interface EditUserPageProps {
  params: {
    userId?: string;
  };
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const user = await getUserById(params);

  if (!user)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Editar usuario" />
      <EditUser user={user} />
    </div>
  );
};

export default EditUserPage;
