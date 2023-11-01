import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prisma';

interface IParams {
  params: {
    electionId?: string;
  };
}

export const runtime = 'edge';

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

    const election = await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        voters: {
          connect: body,
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
