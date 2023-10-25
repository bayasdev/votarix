import Image from 'next/image';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckIcon } from 'lucide-react';

import { ElectionDataCandidate } from '@/types';
import { FormControl } from '@/components/ui/form';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { CandidatePhoto } from '@/components/landing/vote/candidate-photo';

interface CandidateCardProps {
  candidate: ElectionDataCandidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <span className="text-center font-medium tracking-tight">
          {candidate.party.name}
        </span>
        {candidate.party.imageUrl ? (
          <Image
            alt={candidate.party.name}
            src={candidate.party.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="h-12 w-auto"
          />
        ) : (
          <Icons.flag className="h-12 w-12" />
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <CandidatePhoto candidate={candidate} />
        <div className="text-center text-lg font-semibold tracking-tight">
          {candidate.name}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <FormControl>
          <RadioGroup.Item
            value={candidate.id}
            className="aspect-square h-8 w-8 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RadioGroup.Indicator className="flex items-center justify-center">
              <CheckIcon className="h-6 w-6" />
            </RadioGroup.Indicator>
          </RadioGroup.Item>
        </FormControl>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
