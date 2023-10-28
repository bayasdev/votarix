import Link from 'next/link';

import { getPositionsWithElection } from '@/actions/position';
import PositionsClient from '@/components/dashboard/positions/client';
import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import EmptyState from '@/components/empty-state';

const PositionsPage = async () => {
  const positions = await getPositionsWithElection();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Dignidades"
          subtitle="Administrar dignidades de elección popular"
        />
        <Link
          href="/dashboard/positions/create"
          className={cn(buttonVariants())}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Crear dignidad
        </Link>
      </div>
      {positions && positions.length > 0 ? (
        <PositionsClient positions={positions} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PositionsPage;
