'use client';

import Link from 'next/link';
import { CalendarClockIcon, VoteIcon } from 'lucide-react';
import dayjs from 'dayjs';

import { SafeElection } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface ElectionCardProps {
  election: SafeElection;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="tracking-tight">{election.name}</CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <CalendarClockIcon className="h-4 w-4" />
          {dayjs(election.startTime).format('DD/MM/YYYY HH:mm')}
          {' - '}
          {dayjs(election.endTime).format('DD/MM/YYYY HH:mm')}
        </CardDescription>
      </CardHeader>
      <CardContent>{election.description}</CardContent>
      <CardFooter>
        <div className="flex w-full justify-end space-x-2 pt-6">
          <Link href={`/vote/${election.id}`} className={cn(buttonVariants())}>
            <VoteIcon className="mr-2 h-5 w-5" />
            Votar
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ElectionCard;
