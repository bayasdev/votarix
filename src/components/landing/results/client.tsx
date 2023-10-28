'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ElectionResults, SafeElection } from '@/types';
import { IParams as ActionParams } from '@/actions/election';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import ElectionResultsViewer from '@/components/results/viewer';
import EmptyState from '@/components/empty-state';

interface ResultsClientProps {
  elections: SafeElection[] | null;
  getElectionResultsById: (
    // eslint-disable-next-line no-unused-vars
    params: ActionParams,
    // eslint-disable-next-line no-unused-vars
    showOnlyCompleted: boolean,
  ) => Promise<ElectionResults | null>;
}

const ResultsClient: React.FC<ResultsClientProps> = ({
  elections,
  getElectionResultsById,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedElection, setSelectedElection] = React.useState<string>(
    searchParams?.get('electionId') || '',
  );
  const [results, setResults] = React.useState<ElectionResults | null>(null);

  const getResults = React.useCallback(async () => {
    if (!selectedElection) return;

    // store selected electionId in URL
    router.push(`/results?electionId=${selectedElection}`);

    const response = await getElectionResultsById(
      { electionId: selectedElection },
      true,
    );

    if (!response) {
      return toast({
        title: 'Ocurrió un error al obtener los resultados',
        variant: 'destructive',
      });
    }

    setResults(response);
  }, [getElectionResultsById, router, selectedElection]);

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
            <SelectLabel>Proceso Electoral</SelectLabel>
            {elections?.map((election) => (
              <SelectItem key={election.id} value={election.id}>
                {election.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {results ? (
        <ElectionResultsViewer data={results} />
      ) : (
        <EmptyState
          subtitle="Selecciona una elección para ver sus resultados"
          icon="notFound"
        />
      )}
    </div>
  );
};

export default ResultsClient;
