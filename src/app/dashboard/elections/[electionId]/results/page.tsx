import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { getElectionResultsById } from '@/app/actions/election';
import ElectionResultsClient from '@/components/dashboard/elections/results/client';
import Heading from '@/components/heading';

interface ElectionResultsPageProps {
  params: {
    electionId?: string;
  };
}

const ElectionResultsPage = async ({ params }: ElectionResultsPageProps) => {
  const electionResults = await getElectionResultsById(params);
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title={`Resultados de ${electionResults?.electionName}`}
        subtitle={`Corte actualizado el ${dayjs(electionResults?.updatedAt)
          .locale('es')
          .format('DD [de] MMMM [del] YYYY [a las] HH:mm')}`}
      />
      <ElectionResultsClient electionResults={electionResults} />
    </div>
  );
};

export default ElectionResultsPage;
