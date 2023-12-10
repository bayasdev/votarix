import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

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

    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
    });

    if (!election) {
      return new Response('Elección no encontrada', {
        status: 404,
      });
    }

    // If election is ongoing, do not allow to modify voters
    // check startTime and endTime
    if (
      election &&
      election.startTime &&
      election.endTime &&
      election.startTime < new Date() &&
      election.endTime > new Date()
    ) {
      return new Response(
        'No se puede modificar el padrón en una elección en curso',
        {
          status: 400,
        },
      );
    }

    await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        voters: {
          connect: body,
        },
      },
    });

    // reset election
    // remove ballots and certificates

    await prisma.ballot.deleteMany({
      where: {
        electionId,
      },
    });

    await prisma.certificate.deleteMany({
      where: {
        electionId,
      },
    });

    return new Response('Elección reinicializada', {
      status: 200,
    });
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
