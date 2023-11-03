import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/shared/icons';

interface UserAvatarProps extends AvatarProps {
  name: string;
  imageUrl?: string | null;
}

export function UserAvatar({ name, imageUrl, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {imageUrl ? (
        <AvatarImage alt="Picture" src={imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
