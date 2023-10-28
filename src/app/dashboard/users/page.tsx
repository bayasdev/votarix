import Link from 'next/link';

import { getUsers } from '@/actions/user';
import UsersClient from '@/components/dashboard/users/client';
import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import EmptyState from '@/components/empty-state';

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading title="Usuarios" subtitle="Administrar usuarios" />
        <Link href="/dashboard/users/create" className={cn(buttonVariants())}>
          <Icons.add className="mr-2 h-4 w-4" />
          Crear usuario
        </Link>
      </div>
      {users && users.length > 0 ? (
        <UsersClient users={users} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default UsersPage;
