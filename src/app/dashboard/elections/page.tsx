import Link from 'next/link';

import { getElections } from '@/actions/election';
import ElectionsClient from '@/components/dashboard/elections/client';
import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import EmptyState from '@/components/empty-state';

const ElectionsPage = async () => {
  const elections = await getElections();

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
