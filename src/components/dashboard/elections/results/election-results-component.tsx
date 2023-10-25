import { UsersIcon, VoteIcon } from 'lucide-react';
import dayjs from 'dayjs';

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
import { ElectionStatus } from '@/constants';

interface ElectionResultsComponentProps {
  data: ElectionResults | null;
}

const ElectionResultsComponent: React.FC<ElectionResultsComponentProps> = ({
  data,
}) => {
  return (
    <>
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
        <div className="flex-grow overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha de inicio</TableHead>
                <TableHead>Fecha de finalización</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Sufragantes</TableHead>
                <TableHead>Ausentes</TableHead>
                <TableHead>Electores</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {dayjs(data?.startTime).format('DD/MM/YYYY HH:mm')}
                </TableCell>
                <TableCell>
                  {dayjs(data?.endTime).format('DD/MM/YYYY HH:mm')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      data?.status === ElectionStatus.ONGOING
                        ? 'default'
                        : data?.status === ElectionStatus.NOT_STARTED
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {data?.status === ElectionStatus.ONGOING
                      ? 'En curso'
                      : data?.status === ElectionStatus.NOT_STARTED
                      ? 'No iniciada'
                      : 'Finalizada'}
                  </Badge>
                </TableCell>
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
    </>
  );
};

export default ElectionResultsComponent;
