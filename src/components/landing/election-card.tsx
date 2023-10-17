'use client';

import { useRouter } from 'next/navigation';
import { CalendarClockIcon, FileDownIcon, VoteIcon } from 'lucide-react';
import dayjs from 'dayjs';

import { SafeElectionWithStatus } from '@/types';
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
  election: SafeElectionWithStatus;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  const router = useRouter();

  const handleDownloadCertificate = () => {
    router.push(`/api/elections/${election.id}/downloadCertificate`);
  };

  const handleVote = () => {
    router.push(`/vote/${election.id}`);
  };

  return (
    <Card>
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
          <Button onClick={handleVote} disabled={!election.status}>
            <VoteIcon className="mr-2 h-4 w-4" />
            Votar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ElectionCard;
