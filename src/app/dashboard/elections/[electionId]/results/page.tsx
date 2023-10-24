import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { getElectionResultsById } from '@/app/actions/election';
import ElectionResultsClient from '@/components/dashboard/elections/results/client';
import Heading from '@/components/heading';
import EmptyState from '@/components/empty-state';

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
        title={electionResults?.electionName || ''}
        subtitle={`Corte actualizado el ${dayjs(electionResults?.updatedAt)
          .locale('es')
          .format('DD [de] MMMM [del] YYYY [a las] HH:mm')}`}
      />
      {electionResults?.positions.length ? (
        <ElectionResultsClient data={electionResults} />
      ) : (
        <EmptyState
          title="No hay dignidades"
          subtitle="Aún no se han agregado dignidades a esta elección"
        />
      )}
    </div>
  );
};

export default ElectionResultsPage;
