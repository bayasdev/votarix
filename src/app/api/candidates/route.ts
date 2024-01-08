import { z } from 'zod';
import { CandidateType } from '@prisma/client';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { CandidateValidator } from '@/lib/validators/candidate';
import { createAuditLog } from '@/lib/helpers/create-audit-log';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const body = await request.json();

    const { name, email, document, image, partyId, type } =
      CandidateValidator.parse(body);

    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        document,
        imageUrl: image.url,
        imageKey: image.key,
        party: {
          connect: {
            id: partyId,
          },
        },
        type: type as CandidateType,
      },
    });

    await createAuditLog({
      action: 'CREATE',
      entityId: candidate.id,
      entityType: 'CANDIDATE',
      entityName: candidate.name,
    });

    return new Response(candidate.id, { status: 201 });
  } catch (error) {
    console.log('[CREATE_CANDIDATE_ERROR]', error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
