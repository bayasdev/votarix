import { notFound } from 'next/navigation';

import { getUserById } from '@/lib/data/users';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import UserForm from '@/app/dashboard/users/_components/form';

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
