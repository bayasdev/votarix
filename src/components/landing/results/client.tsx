'use client';

import * as React from 'react';
import { UsersIcon, VoteIcon } from 'lucide-react';
import axios from 'axios';

import { ElectionResults, SafeElection } from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface ResultsClientProps {
  elections: SafeElection[] | null;
}

const ResultsClient: React.FC<ResultsClientProps> = ({ elections }) => {
  const [selectedElection, setSelectedElection] = React.useState<string>('');
  const [results, setResults] = React.useState<ElectionResults | null>(null);

  const getResults = React.useCallback(async () => {
    if (!selectedElection) return;
    try {
      const { data } = await axios.get<ElectionResults>(
        `/api/results/${selectedElection}`,
      );
      setResults(data);
    } catch (error) {
      toast({
        title: 'No se pudo obtener los resultados',
        variant: 'destructive',
      });
    }
  }, [selectedElection]);

  React.useEffect(() => {
    getResults();
  }, [getResults, selectedElection]);

  return (
    <div className="flex flex-col gap-6">
      <Select value={selectedElection} onValueChange={setSelectedElection}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione un proceso electoral" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Elecciones</SelectLabel>
            {elections?.map((election) => (
              <SelectItem key={election.id} value={election.id}>
                {election.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {results && (
        <>
          <div className="font-medium tracking-tight">
            <VoteIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
            Resultados por dignidad
          </div>
          <Tabs value={results?.positions[0]?.id} className="w-full">
            <TabsList>
              {results?.positions.map((position) => (
                <TabsTrigger key={position.id} value={position.id}>
                  {position.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {results?.positions.map((position) => (
              <TabsContent
                key={position.id}
                value={position.id}
                className="flex flex-col gap-6"
              >
                {position?.candidates.map((candidate) => (
                  <CandidateResultCard
                    key={candidate.id}
                    candidate={candidate}
                  />
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
                    <TableCell>{results?.totalVotes}</TableCell>
                    <TableCell>{results?.absentVoters}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{results?.totalVoters}</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <VotersChart data={results} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsClient;
