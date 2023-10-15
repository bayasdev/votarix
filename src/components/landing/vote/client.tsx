'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CalendarClockIcon, CheckIcon } from 'lucide-react';
import dayjs from 'dayjs';

import { ElectionData } from '@/types';
import CandidateCard from '@/components/landing/vote/candidate-card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface VoteClientProps {
  electionData: ElectionData | null;
}

const VoteClient: React.FC<VoteClientProps> = ({ electionData }) => {
  const router = useRouter();

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <div className="flex flex-col gap-12">
      {electionData?.positions &&
        electionData.positions.length > 0 &&
        electionData.positions.map((position) => (
          <div
            key={position.id}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="space-y-2 text-center">
              <div className="text-xl font-semibold tracking-tight">
                {position.name}
              </div>
              <div className="text-sm text-muted-foreground">
                Se elige (1) candidato
              </div>
            </div>
            {position?.candidates && position.candidates.length > 0 && (
              <RadioGroup
                className={`grid gap-12 md:grid-cols-${position.candidates.length}`}
              >
                {position.candidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </RadioGroup>
            )}
          </div>
        ))}
      <div className="flex w-full justify-end">
        <Button onClick={handleSubmit}>
          <CheckIcon className="mr-2 h-4 w-4" />
          Enviar voto
        </Button>
      </div>
    </div>
  );
};

export default VoteClient;
