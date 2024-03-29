import { z } from 'zod';
import { CandidateType } from '@prisma/client';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { CandidateValidator } from '@/lib/validators/candidate';
import { utapi } from '@/app/api/uploadthing/core';
import { isCdnUrl, getImageKeyFromUrl } from '@/lib/helpers/uploadthing';
import { createAuditLog } from '@/lib/helpers/create-audit-log';

interface IParams {
  params: {
    candidateId?: string;
  };
}

export async function PUT(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
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

    if (!oldCandidate) {
      return new Response('No encontrado', { status: 404 });
    }

    if (oldCandidate.imageUrl && isCdnUrl(oldCandidate.imageUrl)) {
      const currentImageKey = getImageKeyFromUrl(oldCandidate.imageUrl);

      if (currentImageKey && currentImageKey !== image.key) {
        try {
          await utapi.deleteFiles(currentImageKey);
        } catch (error) {}
      }
    }

    const candidate = await prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        ...body,
        imageKey: image.key,
        imageUrl: image.url,
        type: body.type as CandidateType,
      },
    });

    await createAuditLog({
      action: 'UPDATE',
      entityId: candidate.id,
      entityType: 'CANDIDATE',
      entityName: candidate.name,
    });

    return new Response(candidate.id);
  } catch (error) {
    console.log('[UPDATE_CANDIDATE_ERROR]', error);

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

    if (candidate.imageUrl && isCdnUrl(candidate.imageUrl)) {
      const currentImageKey = getImageKeyFromUrl(candidate.imageUrl);

      if (currentImageKey) {
        try {
          await utapi.deleteFiles(currentImageKey);
        } catch (error) {}
      }
    }

    await prisma.candidate.delete({
      where: {
        id: candidateId,
      },
    });

    await createAuditLog({
      action: 'DELETE',
      entityId: candidate.id,
      entityType: 'CANDIDATE',
      entityName: candidate.name,
    });

    return new Response(candidate.id);
  } catch (error) {
    console.log('[DELETE_CANDIDATE_ERROR]', error);

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
