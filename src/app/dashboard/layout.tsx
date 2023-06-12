import getCurrentUser from '../actions/getCurrentUser';
import Drawer from '@/src/components/Drawer';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Drawer currentUser={currentUser}>{children}</Drawer>
    </div>
  );
}
