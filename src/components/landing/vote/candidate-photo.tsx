import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

interface CandidatePhotoProps extends AvatarProps {
  name: string;
  imageUrl?: string | null;
}

export function CandidatePhoto({ name, imageUrl }: CandidatePhotoProps) {
  return (
    <Avatar className="h-32 w-32">
      {imageUrl ? (
        <AvatarImage alt={name} src={imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="h-16 w-16" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
