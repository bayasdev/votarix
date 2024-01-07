import Image from 'next/image';
import { Flag, User } from 'lucide-react';

import { ElectionResultsParty } from '@/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface ResultsPartyCardProps {
  party: ElectionResultsParty | null;
}

export const ResultsPartyCard: React.FC<ResultsPartyCardProps> = ({
  party,
}) => {
  return (
    <Card className="flex flex-col flex-wrap gap-6 p-6">
      {/* Party */}
      <div className="flex items-center gap-2">
        {party?.imageUrl ? (
          <Image
            alt={party.name}
            src={party.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="h-8 w-auto"
          />
        ) : (
          <Flag className="h-8 w-8" />
        )}
        <div className="text-lg font-semibold tracking-tight">
          {party?.name}
        </div>
      </div>
      {/* Candidates */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {party?.candidates?.map((candidate) => (
          <div className="flex items-center gap-6" key={candidate.id}>
            <Avatar className="h-16 w-16">
              {candidate?.imageUrl ? (
                <AvatarImage alt={candidate.name} src={candidate.imageUrl} />
              ) : (
                <AvatarFallback>
                  <span className="sr-only">{candidate?.name}</span>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <div className="font-semibold tracking-tight">
                {candidate?.name}
              </div>
              <span className="text-sm text-muted-foreground">
                {candidate?.type === 'PRIMARY' ? 'Principal' : 'Alterno'}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Votes */}
      <Progress value={party?.percentage} />
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2 text-center font-medium tracking-tight">
        <span className="text-muted-foreground">{party?.totalVotes} votos</span>
        <span className="font-bold">{party?.percentage.toFixed(2)}%</span>
      </div>
    </Card>
  );
};
