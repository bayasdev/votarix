import dayjs from 'dayjs';

import { SafeElection } from '@/types';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface ElectionCardProps {
  election: SafeElection;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[360px] flex-col justify-between rounded-md p-6">
        <Icons.vote className="h-12 w-12" />
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold">{election.name}</h3>
            <p className="text-sm text-muted-foreground">
              {election.description}
            </p>
          </div>
          <Link
            href={`/vote/${election.id}`}
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            Votar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
