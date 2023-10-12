import { Role } from '@prisma/client';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== Role.ADMIN) {
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
          disconnect: body,
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
