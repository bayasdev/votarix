import { Role } from '@prisma/client';
import { z } from 'zod';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { CandidateValidator } from '@/lib/validators/candidate';
import { utapi } from '@/app/api/uploadthing/core';

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

    const { image, ...body } = CandidateValidator.parse(await request.json());

    const oldCandidate = await prisma.candidate.findUnique({
      where: {
        id: candidateId,
      },
    });

    // if there is a new image, delete the old one
    if (image && oldCandidate?.imageKey) {
      await utapi.deleteFiles(oldCandidate?.imageKey);
    }

    const updatedCandidate = await prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        ...body,
        imageKey: image.key,
        imageUrl: image.url,
      },
    });

    return new Response(updatedCandidate.id);
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

    const candidate = await prisma.candidate.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) {
      return new Response('No encontrado', { status: 404 });
    }

    // if there is a image, delete it
    if (candidate?.imageKey) {
      await utapi.deleteFiles(candidate.imageKey);
    }

    await prisma.candidate.delete({
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
