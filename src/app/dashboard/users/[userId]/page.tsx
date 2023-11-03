import { notFound } from 'next/navigation';

import { getUserById } from '@/lib/data/user';
import GoBack from '@/components/go-back';
import Heading from '@/components/heading';
import UserForm from '@/components/dashboard/users/form';

interface UpdateUserPageProps {
  params: {
    userId?: string;
  };
}

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {
  const user = await getUserById(params);
  if (!user) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Editar usuario"
          subtitle="Actualice un usuario existente"
        />
        <GoBack />
      </div>
      <UserForm initialData={user} />
    </div>
  );
};

export default UpdateUserPage;
