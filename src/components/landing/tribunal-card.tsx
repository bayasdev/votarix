import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserIcon } from 'lucide-react';

interface TribunalCardProps {
  name: string;
  title: string;
  imageUrl?: string;
}

const TribunalCard: React.FC<TribunalCardProps> = ({
  name,
  title,
  imageUrl,
}) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col items-center justify-center text-center">
        <Avatar className="h-24 w-24">
          {imageUrl ? (
            <AvatarImage alt={name} src={imageUrl} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{name}</span>
              <UserIcon className="h-12 w-12" />
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-xl tracking-tight">{name}</CardTitle>
        <CardDescription className="trackint-tight">{title}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TribunalCard;
