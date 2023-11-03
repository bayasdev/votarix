import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { VotersDisconnectValidator } from '@/lib/validators/voters-disconnect';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { electionId } = params;

    if (!electionId || typeof electionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const body = await request.json();

    const voters = VotersDisconnectValidator.parse(body);

    const election = await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        voters: {
          disconnect: voters,
        },
      },
    });

    // also remove ballots and certificates

    await prisma.ballot.deleteMany({
      where: {
        electionId,
        userId: {
          in: voters.map((voter) => voter.id),
        },
      },
    });

    await prisma.certificate.deleteMany({
      where: {
        electionId,
        userId: {
          in: voters.map((voter) => voter.id),
        },
      },
    });

    return new Response(election.id);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
