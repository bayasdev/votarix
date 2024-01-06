import { notFound } from 'next/navigation';

import { getPartyById } from '@/lib/data/party';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import PartyForm from '@/app/dashboard/parties/_components/form';
import { getElections } from '@/lib/data/election';

interface UpdatePartyPageProps {
  params: {
    partyId?: string;
  };
}

const UpdatePartyPage = async ({ params }: UpdatePartyPageProps) => {
  const party = await getPartyById(params);
  const elections = await getElections();

  if (!party) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Editar partido político"
          subtitle="Actualice los datos de un partido político existente"
        />
        <GoBack />
      </div>
      <PartyForm initialData={party} elections={elections} />
    </div>
  );
};

export default UpdatePartyPage;
