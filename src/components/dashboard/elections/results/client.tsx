'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Loader2, PauseIcon, UsersIcon, VoteIcon } from 'lucide-react';

import { ElectionResults } from '@/types';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
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
import { toast } from '@/components/ui/use-toast';

interface ElectionResultsClientProps {
  data: ElectionResults | null;
}

const ElectionResultsClient: React.FC<ElectionResultsClientProps> = ({
  data,
}) => {
  const [autoRefresh, setAutoRefresh] = React.useState<boolean>(true);
  const refreshInterval = 180;
  const router = useRouter();

  const handleRefresh = React.useCallback(() => {
    router.refresh();
    toast({
      title: 'Resultados actualizados',
    });
  }, [router]);

  React.useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(handleRefresh, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, handleRefresh]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title={data?.electionName || ''}
          subtitle={`Corte actualizado el ${dayjs(data?.updatedAt)
            .locale('es')
            .format('DD [de] MMMM [del] YYYY [a las] HH:mm')}`}
        />
        <Button
          variant={autoRefresh ? 'default' : 'secondary'}
          onClick={() => setAutoRefresh(!autoRefresh)}
        >
          {autoRefresh ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Actualizando cada {refreshInterval} segundos
            </>
          ) : (
            <>
              <PauseIcon className="mr-2 h-4 w-4" />
              Actualización automática pausada
            </>
          )}
        </Button>
      </div>
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
