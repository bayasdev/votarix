import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UsersRound } from 'lucide-react';

import { getElectionProposalsById } from '@/lib/data/elections';
import Heading from '@/components/shared/heading';
import GoBack from '@/components/shared/go-back';
import EmptyState from '@/components/shared/empty-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProposalsPartyCard } from './_components/card';

interface ProposalsByElectionPageProps {
  params: {
    electionId: string;
  };
}

export const metadata: Metadata = {
  title: 'Propuestas de los candidatos',
};

const ProposalsByElectionPage: React.FC<ProposalsByElectionPageProps> = async ({
  params,
}) => {
  const data = await getElectionProposalsById(params);

  if (!data) return notFound();

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title={data.name as string}
          subtitle="Conoce las propuestas de los candidatos que participan en esta elección"
        />
        <GoBack />
      </div>
      {data.positions && data.positions.length >= 0 ? (
        <>
          <div className="font-medium tracking-tight">
            <UsersRound className="mr-2 inline-block h-5 w-5" />
            Selecciona una dignidad
          </div>
          <Tabs defaultValue={data.positions[0]?.id}>
            <div className="overflow-x-auto">
              <TabsList>
                {data?.positions.map((position) => (
                  <TabsTrigger key={position.id} value={position.id}>
                    {position.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {data.positions.map((position) => (
              <TabsContent
                key={position.id}
                value={position.id}
                className="grid gap-12 md:grid-cols-2"
              >
                {position.parties.map((party) => (
                  <ProposalsPartyCard party={party} key={party.id} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </>
      ) : (
        <EmptyState
          title="No hay dignidades en esta elección"
          subtitle="Intenta más tarde"
          icon="notFound"
          showGoBack
        />
      )}
    </div>
  );
};

export default ProposalsByElectionPage;
