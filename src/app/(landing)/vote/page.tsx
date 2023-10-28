import { Metadata } from 'next';

import { getAvailableElectionsForCurrentUser } from '@/actions/election';
import Heading from '@/components/heading';
import ElectionCard from '@/components/landing/election-card';
import EmptyState from '@/components/empty-state';

export const metadata: Metadata = {
  title: 'Elecciones',
};

const ElectionsPage = async () => {
  const elections = await getAvailableElectionsForCurrentUser();
  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Elecciones en curso"
        subtitle="Selecciona una elección para votar"
      />
      {elections && elections.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {elections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aquí no hay nada"
          subtitle="No puedes participar en ninguna elección en este momento"
          showGoBack
        />
      )}
    </div>
  );
};

export default ElectionsPage;
