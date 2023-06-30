import getCurrentUser from '../actions/getCurrentUser';
import Drawer from '@/src/components/dashboard/common/Drawer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const currentUser = await getCurrentUser();

  return <Drawer currentUser={currentUser}>{children}</Drawer>;
};

export default DashboardLayout;
