'use client';

import { ElectionResults } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CandidateResultCard from '@/components/dashboard/elections/results/candidate-result-card';
import VotersChart from '@/components/dashboard/elections/results/voters-chart';
import { Badge } from '@/components/ui/badge';
import { UsersIcon, VoteIcon } from 'lucide-react';

interface ElectionResultsClientProps {
  data: ElectionResults | null;
}

const ElectionResultsClient: React.FC<ElectionResultsClientProps> = ({
  data,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-medium tracking-tight">
        <VoteIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
        Resultados por dignidad
      </div>
      <Tabs defaultValue={data?.positions[0]?.id} className="w-full">
        <TabsList>
          {data?.positions.map((position) => (
            <TabsTrigger key={position.id} value={position.id}>
              {position.name}
            </TabsTrigger>
          ))}
        </TabsList>
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
      <div className="font-medium tracking-tight">
        <UsersIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
        Participación electoral
      </div>
      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sufragantes</TableHead>
                <TableHead>Ausentes</TableHead>
                <TableHead>Electores</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{data?.totalVotes}</TableCell>
                <TableCell>{data?.absentVoters}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{data?.totalVoters}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <VotersChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsClient;
