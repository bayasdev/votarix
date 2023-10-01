import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import { getUsers } from '../../actions/user';
import UsersClient from '@/src/components/dashboard/users/UsersClient';
import Heading from '@/src/components/common/Heading';
import EmptyState from '@/src/components/common/EmptyState';

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading title="Usuarios" subtitle="Administrar usuarios" />
        <Link href="/dashboard/users/create" className="btn btn-primary">
          <MdOutlineAdd size={20} />
          Crear
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
