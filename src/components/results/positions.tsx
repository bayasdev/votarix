import { VoteIcon } from 'lucide-react';

import { ElectionResults } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CandidateResultCard from '@/components/results/candidate-card';

interface ElectionResultsByPositionProps {
  data: ElectionResults | null;
}

const ElectionResultsByPosition: React.FC<ElectionResultsByPositionProps> = ({
  data,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-medium tracking-tight">
        <VoteIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
        Resultados por dignidad
      </div>
      <Tabs defaultValue={data?.positions[0]?.id}>
        <div className="overflow-x-auto">
          <TabsList>
            {data?.positions.map((position) => (
              <TabsTrigger key={position.id} value={position.id}>
                {position.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {data?.positions.map((position) => (
          <TabsContent
            key={position.id}
            value={position.id}
            className="flex flex-col gap-6"
          >
            {position?.candidates.map((candidate) => (
              <CandidateResultCard key={candidate.id} candidate={candidate} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ElectionResultsByPosition;
