import { notFound } from 'next/navigation';

import { getUserById } from '@/lib/data/users';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import UserPasswordForm from '@/app/dashboard/users/_components/password/form';
import { getCurrentUser } from '@/lib/session';

interface UpdateUserPageProps {
  params: {
    userId?: string;
  };
}

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params);
  if (!user) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Cambiar contraseña"
          subtitle="Actualice la contraseña de un usuario existente"
        />
        <GoBack />
      </div>
      <UserPasswordForm currentUser={currentUser} initialData={user} />
    </div>
  );
};

export default UpdateUserPage;
