'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ElectionResultsResponse, SafeElection } from '@/types';
import { IParams as ActionParams } from '@/lib/data/elections';
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
import { Results } from '@/components/results';
import EmptyState from '@/components/shared/empty-state';
import LoadingSkeleton from '@/components/shared/loading-skeleton';

interface ResultsClientProps {
  elections: SafeElection[] | null;
  getElectionResultsById: (
    // eslint-disable-next-line no-unused-vars
    params: ActionParams,
    // eslint-disable-next-line no-unused-vars
    showOnlyCompleted: boolean,
  ) => Promise<ElectionResultsResponse | null>;
}

const ResultsClient: React.FC<ResultsClientProps> = ({
  elections,
  getElectionResultsById,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedElection, setSelectedElection] = useState<string>(
    searchParams?.get('electionId') || '',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ElectionResultsResponse | null>(null);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams || '');
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const getResults = useCallback(async () => {
    if (!selectedElection) return;
    setIsLoading(true);

    // store selected electionId in URL
    router.push(
      '/results?' + createQueryString('electionId', selectedElection),
    );

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
    setIsLoading(false);
  }, [createQueryString, getElectionResultsById, router, selectedElection]);

  useEffect(() => {
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
      {isLoading ? (
        <LoadingSkeleton />
      ) : results ? (
        <Results data={results} />
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
