import Link from 'next/link';

import { getParties } from '@/lib/data/party';
import PartiesClient from '@/components/dashboard/parties/client';
import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import EmptyState from '@/components/empty-state';

const PartiesPage = async () => {
  const parties = await getParties();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Partidos políticos"
          subtitle="Administrar partidos políticos"
        />
        <Link href="/dashboard/parties/create" className={cn(buttonVariants())}>
          <Icons.add className="mr-2 h-4 w-4" />
          Crear partido político
        </Link>
      </div>
      {parties && parties.length > 0 ? (
        <PartiesClient parties={parties} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PartiesPage;
