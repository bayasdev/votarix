import getCurrentUser from '../actions/getCurrentUser';
import Drawer from '@/src/components/dashboard/common/Drawer';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return <Drawer currentUser={currentUser}>{children}</Drawer>;
}
