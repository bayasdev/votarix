import Link from 'next/link';

import { getElectionsWithStatus } from '@/lib/data/election';
import ElectionsClient from '@/app/dashboard/elections/_components/client';
import Heading from '@/components/shared/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import EmptyState from '@/components/shared/empty-state';

const ElectionsPage = async () => {
  const elections = await getElectionsWithStatus();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading title="Elecciones" subtitle="Administrar elecciones" />
        <Link
          href="/dashboard/elections/create"
          className={cn(buttonVariants())}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Crear elección
        </Link>
      </div>
      {elections && elections.length > 0 ? (
        <ElectionsClient elections={elections} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ElectionsPage;
