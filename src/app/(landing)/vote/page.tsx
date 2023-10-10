import { getOngoingElections } from '@/app/actions/election';
import Heading from '@/components/heading';
import ElectionCard from '@/components/landing/election-card';

const VotePage = async () => {
  const elections = await getOngoingElections();
  return (
    <div className="flex flex-col gap-6 px-8 lg:px-24">
      <Heading title="Votar" subtitle="Selecciona una elección para votar" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {elections &&
          elections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))}
      </div>
    </div>
  );
};

export default VotePage;
