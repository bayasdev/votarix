import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../../components/EmptyState';
import DashboardHome from '@/src/components/dashboard/DashboardHome';

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login" showReset />
    );
  }

  return <DashboardHome />;
};

export default DashboardPage;
