import Image from 'next/image';
import { Check } from 'lucide-react';

import { ElectionDataParty } from '@/types';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Icons } from '@/components/shared/icons';
import { CandidatePhoto } from '@/app/(landing)/vote/_components/vote/candidate-photo';

interface VoteCardProps {
  party: ElectionDataParty;
  children?: React.ReactNode;
}

const VoteCard: React.FC<VoteCardProps> = ({ party, children }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <div className="text-center font-semibold tracking-tight">
          {party.name}
        </div>
        {party.imageUrl ? (
          <Image
            alt={party.name}
            src={party.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="h-12 w-auto"
          />
        ) : (
          <Icons.flag className="h-12 w-12" />
        )}
      </CardHeader>
      <CardContent>
        {party.candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex flex-col items-center justify-center gap-4"
          >
            <CandidatePhoto candidate={candidate} />
            <div className="space-y-1 text-center">
              <div className="font-semibold tracking-tight">
                {candidate.name}
              </div>
              <span className="text-sm text-muted-foreground">
                {candidate.type === 'PRIMARY' ? 'Principal' : 'Alterno'}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        {children}
      </CardFooter>
    </Card>
  );
};

export default VoteCard;
