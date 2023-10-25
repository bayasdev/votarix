import { FlagIcon, UserIcon } from 'lucide-react';

import { ElectionResultsCandidate } from '@/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface CandidateResultCardProps {
  candidate: ElectionResultsCandidate | null;
}

const CandidateResultCard: React.FC<CandidateResultCardProps> = ({
  candidate,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center gap-8">
        <Avatar className="h-20 w-20">
          {candidate?.imageUrl ? (
            <AvatarImage alt={candidate.name} src={candidate.imageUrl} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{candidate?.name}</span>
              <UserIcon className="h-10 w-10" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-semibold tracking-tight">{candidate?.name}</div>
          <div className="flex items-center gap-2">
            {candidate?.party.imageUrl ? (
              <Image
                alt={candidate.party.name}
                src={candidate.party.imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                className="h-4 w-auto"
              />
            ) : (
              <FlagIcon className="h-4 w-4" />
            )}
            <div className="text-sm text-muted-foreground">
              {candidate?.party.name}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-6">
        <Progress value={candidate?.percentage} />
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 text-center font-medium tracking-tight">
          <span className="text-muted-foreground">
            {candidate?.votes} votos
          </span>
          <span className="font-bold">{candidate?.percentage.toFixed(2)}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateResultCard;