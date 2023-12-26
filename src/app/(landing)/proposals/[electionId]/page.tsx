import { notFound } from 'next/navigation';
import { Flag, User } from 'lucide-react';

import { getElectionDataWithProposalsById } from '@/lib/data/election';
import { CandidateProposal } from '@/types';
import Heading from '@/components/shared/heading';
import EmptyState from '@/components/shared/empty-state';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

interface ProposalsByElectionPageProps {
  params: {
    electionId: string;
  };
}

const ProposalsByElectionPage: React.FC<ProposalsByElectionPageProps> = async ({
  params,
}) => {
  const data = await getElectionDataWithProposalsById(params);
  if (!data) return notFound();

  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title={data.name as string}
        subtitle="Conoce las propuestas de los candidatos que participan en esta elección"
      />
      {data.positions && data.positions.length >= 0 ? (
        <>
          {data.positions.map((position) => (
            <div key={position.id} className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold">{position.name}</h2>
              {position.candidates.map((candidate) => (
                <div key={candidate.id} className="flex flex-col gap-6">
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
                    <div className="flex flex-col justify-center gap-2">
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
                  <h3 className="text-lg font-semibold">Propuestas</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Propuesta</TableHead>
                        <TableHead>Descripción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {JSON.parse(candidate.proposals).map(
                        (proposal: CandidateProposal) => (
                          <TableRow key={proposal.name}>
                            <TableCell>{proposal.name}</TableCell>
                            <TableCell>{proposal.description}</TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          ))}
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
