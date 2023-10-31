import { Metadata } from 'next';

import { getDashboardData } from '@/actions/dashboard';
import DashboardClient from '@/components/dashboard/home/client';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = async () => {
  const data = await getDashboardData();

  return <DashboardClient data={data} />;
};

export default DashboardPage;
