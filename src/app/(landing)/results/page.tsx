import { Metadata } from 'next';

import Heading from '@/components/heading';
import { getFinishedElections } from '@/actions/election';
import ResultsClient from '@/components/landing/results/client';

export const metadata: Metadata = {
  title: 'Resultados de las elecciones',
};

const ResultsPage = async () => {
  const elections = await getFinishedElections();

  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Resultados de las elecciones"
        subtitle="Selecciona un proceso electoral para ver sus resultados"
      />
      <ResultsClient elections={elections} />
    </div>
  );
};

export default ResultsPage;
