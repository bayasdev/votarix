import { Metadata } from 'next';

import { getDashboardData } from '@/lib/data/dashboard';
import Heading from '@/components/shared/heading';
import DashboardClient from '@/app/dashboard/(home)/_components/client';
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
