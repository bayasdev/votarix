import Link from 'next/link';

import { getPartiesWithPositionAndElection } from '@/lib/data/parties';
import PartiesClient from '@/app/dashboard/parties/_components/client';
import Heading from '@/components/shared/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import EmptyState from '@/components/shared/empty-state';

const PartiesPage = async () => {
  const parties = await getPartiesWithPositionAndElection();

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
