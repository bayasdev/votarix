import { PieChart, Vote } from 'lucide-react';

import { ElectionResultsResponse } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VotesBreakdownChart } from './chart';
import { ResultsPartyCard } from './party-card';
import { VotesBreakdownTable } from './table';

interface ResultsByPositionProps {
  data: ElectionResultsResponse | null;
}

export const ResultsByPosition: React.FC<ResultsByPositionProps> = ({
  data,
}) => {
  return (
    <>
      <div className="font-medium tracking-tight">
        <Vote className="mr-2 inline-block h-5 w-5" />
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
            {position?.parties.map((party) => (
              <ResultsPartyCard key={party.id} party={party} />
            ))}
            <div className="font-medium tracking-tight">
              <PieChart className="mr-2 inline-block h-5 w-5" />
              Resumen de votos
            </div>
            <div className="flex flex-wrap justify-between gap-6 lg:flex-nowrap">
              <div className="flex-grow overflow-auto">
                <VotesBreakdownTable
                  totalValidVotes={position.totalValidVotes}
                  totalNullVotes={position.totalNullVotes}
                  totalBlankVotes={position.totalBlankVotes}
                />
              </div>
              <div>
                <VotesBreakdownChart
                  totalValidVotes={position.totalValidVotes}
                  totalNullVotes={position.totalNullVotes}
                  totalBlankVotes={position.totalBlankVotes}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};
