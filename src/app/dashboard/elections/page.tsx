import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import { getElections } from '../../actions/election';
import ElectionsClient from '@/src/components/dashboard/elections/ElectionsClient';
import Heading from '@/src/components/common/Heading';
import EmptyState from '@/src/components/common/EmptyState';

const ElectionsPage = async () => {
  const elections = await getElections();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading title="Elecciones" subtitle="Administrar elecciones" />
        <Link href="/dashboard/elections/create" className="btn btn-primary">
          <MdOutlineAdd size={20} />
          Crear
        </Link>
      </div>
      {elections && elections.length > 0 ? (
        <ElectionsClient elections={elections} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ElectionsPage;
