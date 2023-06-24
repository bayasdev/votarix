import Link from 'next/link';
import { MdOutlineAdd } from 'react-icons/md';

import getParties from '../../actions/getParties';
import PartiesClient from '@/src/components/dashboard/parties/PartiesClient';
import Heading from '@/src/components/ui/Heading';
import EmptyState from '@/src/components/EmptyState';

const PartiesPage = async () => {
  const parties = await getParties();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading
          title="Partidos Políticos"
          subtitle="Administrar partidos políticos"
        />
        <Link href="/dashboard/parties/create" className="btn-primary btn">
          <MdOutlineAdd size={20} />
          Crear
        </Link>
      </div>
      {parties && parties.length > 0 ? (
        <PartiesClient parties={parties} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PartiesPage;
