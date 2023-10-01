import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import { getPositions } from '../../actions/position';
import PositionsClient from '@/src/components/dashboard/positions/PositionsClient';
import Heading from '@/src/components/common/Heading';
import EmptyState from '@/src/components/common/EmptyState';

const PositionsPage = async () => {
  const positions = await getPositions();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading
          title="Puestos Electivos"
          subtitle="Administrar puestos electivos"
        />
        <Link href="/dashboard/positions/create" className="btn btn-primary">
          <MdOutlineAdd size={20} />
          Crear
        </Link>
      </div>
      {positions && positions.length > 0 ? (
        <PositionsClient positions={positions} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PositionsPage;
