import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../../components/common/EmptyState';
import Home from '@/src/components/dashboard/Home';

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return <Home />;
};

export default DashboardPage;
