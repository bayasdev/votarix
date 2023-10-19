'use client';

import { useRouter } from 'next/navigation';
import { CalendarClockIcon, VoteIcon } from 'lucide-react';
import dayjs from 'dayjs';

import { SafeElectionWithStatusAndCanVote } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ElectionCardProps {
  election: SafeElectionWithStatusAndCanVote;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  const router = useRouter();

  const handleVote = () => {
    router.push(`/vote/${election.id}`);
  };

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
          <Button
            onClick={handleVote}
            disabled={!election.canVote || !election.status}
          >
            <VoteIcon className="mr-2 h-5 w-5" />
            Votar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ElectionCard;
