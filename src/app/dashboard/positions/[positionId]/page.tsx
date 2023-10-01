import { getPositionById } from '@/src/app/actions/position';
import EmptyState from '@/src/components/common/EmptyState';
import Heading from '@/src/components/common/Heading';
import GoBack from '@/src/components/dashboard/common/GoBack';
import EditPosition from '@/src/components/dashboard/positions/EditPosition';

interface EditPositionPageProps {
  params: {
    positionId?: string;
  };
}

const EditPositionPage = async ({ params }: EditPositionPageProps) => {
  const position = await getPositionById(params);

  if (!position)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <GoBack />
      <Heading title="Editar puesto electivo" />
      <EditPosition position={position} />
    </div>
  );
};

export default EditPositionPage;
