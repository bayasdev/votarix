import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Flag, ListChecks, User, UsersRound } from 'lucide-react';

import { getElectionDataWithProposalsById } from '@/lib/data/election';
import { PartyProposal } from '@/types';
import Heading from '@/components/shared/heading';
import GoBack from '@/components/shared/go-back';
import EmptyState from '@/components/shared/empty-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

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
  const data = await getElectionDataWithProposalsById(params);
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
                className="grid gap-6 md:grid-cols-2"
              >
                {position.candidates.map((candidate) => (
                  <Card key={candidate.id} className="flex flex-col gap-6 p-8">
                    {/* Candidate info */}
                    <div className="flex flex-col flex-wrap gap-6 md:flex-row md:items-center">
                      <Avatar className="h-20 w-20">
                        {candidate?.imageUrl ? (
                          <AvatarImage
                            alt={candidate.name}
                            src={candidate.imageUrl}
                          />
                        ) : (
                          <AvatarFallback>
                            <span className="sr-only">{candidate?.name}</span>
                            <User className="h-10 w-10" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-semibold tracking-tight">
                          {candidate?.name}
                        </div>
                        <div className="flex items-center gap-2">
                          {candidate?.party.imageUrl ? (
                            <Image
                              alt={candidate.party.name}
                              src={candidate.party.imageUrl}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="h-4 w-auto"
                            />
                          ) : (
                            <Flag className="h-4 w-4" />
                          )}
                          <div className="text-sm text-muted-foreground">
                            {candidate?.party.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Candidate proposals */}
                    <div className="font-semibold tracking-tight">
                      <ListChecks className="mr-2 inline-block h-5 w-5" />
                      Propuestas
                    </div>
                    {JSON.parse(candidate.proposals).map(
                      (proposal: PartyProposal) => (
                        <div key={proposal.name}>
                          <div className="font-medium tracking-tight">
                            {proposal.name}
                          </div>
                          <div className="text-muted-foreground">
                            {proposal.description}
                          </div>
                        </div>
                      ),
                    )}
                  </Card>
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
