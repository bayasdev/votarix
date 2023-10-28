'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import { toast } from '@/components/ui/use-toast';
import ElectionResultsViewer from '@/components/results/viewer';

interface ResultsClientProps {
  elections: SafeElection[] | null;
}

const ResultsClient: React.FC<ResultsClientProps> = ({ elections }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedElection, setSelectedElection] = React.useState<string>(
    searchParams?.get('electionId') || '',
  );
  const [results, setResults] = React.useState<ElectionResults | null>(null);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams || '');
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const getResults = React.useCallback(async () => {
    if (!selectedElection) return;

    // set selected election in url
    router.push(
      pathname + '?' + createQueryString('electionId', selectedElection),
    );

    axios
      .get<ElectionResults>(`/api/results/${selectedElection}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error al obtener los resultados',
          description: error?.response?.data,
          variant: 'destructive',
        });
      });
  }, [createQueryString, pathname, router, selectedElection]);

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
      {results && <ElectionResultsViewer data={results} />}
    </div>
  );
};

export default ResultsClient;
