import { getPartyById } from '@/src/app/actions/party';
import EmptyState from '@/src/components/common/EmptyState';
import Heading from '@/src/components/common/Heading';
import EditParty from '@/src/components/dashboard/parties/EditParty';

interface EditPartyPageProps {
  params: {
    partyId?: string;
  };
}

const EditPartyPage = async ({ params }: EditPartyPageProps) => {
  const party = await getPartyById(params);

  if (!party)
    return <EmptyState title="Error 404" subtitle="Página no encontrada" />;

  return (
    <div className="flex flex-col gap-8">
      <Heading title="Editar partido político" />
      <EditParty party={party} />
    </div>
  );
};

export default EditPartyPage;
