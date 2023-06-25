import { Role } from '@prisma/client';
import { z } from 'zod';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';
import { CandidateValidator } from '@/src/lib/validators/candidate';

interface IParams {
  params: {
    candidateId?: string;
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

    const { candidateId } = params;

    if (!candidateId || typeof candidateId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const body = CandidateValidator.parse(await request.json());

    const candidate = await prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        ...body,
      },
    });

    return new Response(candidate.id);
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

    const { candidateId } = params;

    if (!candidateId || typeof candidateId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const candidate = await prisma.candidate.delete({
      where: {
        id: candidateId,
      },
    });

    return new Response(candidate.id);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
