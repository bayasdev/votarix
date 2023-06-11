import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../../components/EmptyState';

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login" showReset />
    );
  }

  return (
    <div>
      <div>dashboard page</div>
    </div>
  );
};

export default DashboardPage;
