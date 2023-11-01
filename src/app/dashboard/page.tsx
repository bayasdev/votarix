import { Metadata } from 'next';

import { getDashboardData } from '@/actions/dashboard';
import Heading from '@/components/heading';
import DashboardClient from '@/components/dashboard/home/client';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = async () => {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <Heading
        title="Bienvenido de nuevo"
        subtitle={`Conozca el estado del sistema de votación electrónica ${siteConfig.name}`}
      />
      <DashboardClient data={data} />
    </div>
  );
};

export default DashboardPage;
