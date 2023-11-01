import { Metadata } from 'next';
import { Suspense } from 'react';

import { getDashboardData } from '@/actions/dashboard';
import DashboardClient from '@/components/dashboard/home/client';
import DashboardSkeleton from '@/components/dashboard/home/skeleton';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = async () => {
  const data = await getDashboardData();

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClient data={data} />
    </Suspense>
  );
};

export default DashboardPage;
