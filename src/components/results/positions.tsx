import { PieChart, Vote } from 'lucide-react';

import { ElectionResults } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CandidateResultCard from '@/components/results/candidate-card';
import VotesBreakdownChart from '@/components/results/votes-breakdown-chart';

interface ElectionResultsByPositionProps {
  data: ElectionResults | null;
}

const ElectionResultsByPosition: React.FC<ElectionResultsByPositionProps> = ({
  data,
}) => {
  return (
    <div className="flex flex-col gap-6">
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
            {position?.candidates.map((candidate) => (
              <CandidateResultCard key={candidate.id} candidate={candidate} />
            ))}
            <div className="font-medium tracking-tight">
              <PieChart className="mr-2 inline-block h-5 w-5" />
              Resumen de votos
            </div>
            <div className="flex flex-wrap justify-between gap-6">
              <div className="flex-grow overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Votos válidos</TableHead>
                      <TableHead>Votos nulos</TableHead>
                      <TableHead>Votos blancos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{position.validVotes}</TableCell>
                      <TableCell>{position.nullVotes}</TableCell>
                      <TableCell>{position.blankVotes}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <VotesBreakdownChart
                  validVotes={position.validVotes}
                  nullVotes={position.nullVotes}
                  blankVotes={position.blankVotes}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ElectionResultsByPosition;
