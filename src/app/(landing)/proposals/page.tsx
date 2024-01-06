import { Metadata } from 'next';

import Heading from '@/components/shared/heading';
import { getElections } from '@/lib/data/elections';
import EmptyState from '@/components/shared/empty-state';
import ElectionLink from './_components/link';

export const metadata: Metadata = {
  title: 'Conoce al candidato',
};

const ProposalsPage = async () => {
  const elections = await getElections();

  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Conoce al candidato"
        subtitle="Selecciona una elección para conocer las propuestas de los candidatos"
      />
      <div>
        {elections && elections.length >= 0 ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {elections.map((election) => (
              <ElectionLink key={election.id} election={election} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No hay elecciones"
            subtitle="No hay elecciones disponibles en este momento"
          />
        )}
      </div>
    </div>
  );
};

export default ProposalsPage;
