import { columns } from '@/components/dashboard/users/columns';
import { DataTable } from '@/components/dashboard/data-table';
import { SafeUser } from '@/types';

interface UsersClientProps {
  users: SafeUser[] | null;
}

const UsersClient: React.FC<UsersClientProps> = ({ users }) => {
  return <DataTable columns={columns} data={users} searchKey="email" />;
};

export default UsersClient;
