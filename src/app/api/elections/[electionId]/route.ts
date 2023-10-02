import { Role } from '@prisma/client';
import { z } from 'zod';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';
import { ElectionValidator } from '@/src/lib/validators/election';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function PUT(request: Request, { params }: IParams) {
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

    if (!currentUser || currentUser.role !== Role.ADMIN) {
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