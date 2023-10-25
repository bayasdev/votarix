import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { ElectionResultsCandidate } from '@/types';

interface CandidatePhotoProps extends AvatarProps {
  candidate: ElectionResultsCandidate;
}

export function CandidatePhoto({ candidate }: CandidatePhotoProps) {
  return (
    <Avatar className="h-32 w-32">
      {candidate?.imageUrl ? (
        <AvatarImage alt={candidate.name} src={candidate.imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{candidate.name}</span>
          <Icons.user className="h-16 w-16" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
