import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { ElectionValidator } from '@/lib/validators/election';
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

    const { name, description, startsAt, endsAt } =
      ElectionValidator.parse(body);

    const election = await prisma.election.create({
      data: {
        name,
        description,
        startsAt,
        endsAt,
      },
    });

    await createAuditLog({
      action: 'CREATE',
      entityId: election.id,
      entityType: 'ELECTION',
      entityName: election.name,
    });

    return new Response(election.id, { status: 201 });
  } catch (error) {
    console.log('[CREATE_ELECTION_ERROR]', error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
