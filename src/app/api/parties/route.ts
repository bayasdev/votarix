import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { PartyValidator } from '@/lib/validators/party';
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

    const { name, image, electionId, proposals } = PartyValidator.parse(body);

    const party = await prisma.party.create({
      data: {
        name,
        imageKey: image.key,
        imageUrl: image.url,
        electionId,
        proposals,
      },
    });

    await createAuditLog({
      action: 'CREATE',
      entityId: party.id,
      entityType: 'PARTY',
      entityName: party.name,
    });

    return new Response(party.id, { status: 201 });
  } catch (error) {
    console.log('[PARTY_CREATE_ERROR]', error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
