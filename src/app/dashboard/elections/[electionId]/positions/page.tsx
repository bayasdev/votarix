import { getPositionsByElectionId } from '@/src/app/actions/position';
import { getElectionById } from '@/src/app/actions/election';
import EmptyState from '@/src/components/common/EmptyState';
import Heading from '@/src/components/common/Heading';
import PositionsClient from '@/src/components/dashboard/positions/PositionsClient';
import GoBack from '@/src/components/dashboard/common/GoBack';

interface PositionsByElectionPageProps {
  params: {
    electionId?: string;
  };
}

const PositionsByElectionPage = async ({
  params,
}: PositionsByElectionPageProps) => {
  const election = await getElectionById(params);
  const positions = await getPositionsByElectionId(params);

  if (!election)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title={`Puestos electivos en ${election?.name}`} />
      {positions && positions.length > 0 ? (
        <PositionsClient positions={positions} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PositionsByElectionPage;
