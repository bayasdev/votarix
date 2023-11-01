import { z } from 'zod';

import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { ElectionValidator } from '@/lib/validators/election';

interface IParams {
  params: {
    electionId?: string;
  };
}

export const runtime = 'edge';

export async function PUT(request: Request, { params }: IParams) {
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

    const body = ElectionValidator.parse(await request.json());

    const election = await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        ...body,
      },
    });

    return new Response(election.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}

export async function DELETE(request: Request, { params }: IParams) {
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

    const election = await prisma.election.delete({
      where: {
        id: electionId,
      },
    });

    return new Response(election.id);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
