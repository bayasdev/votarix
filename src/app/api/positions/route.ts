import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { PositionValidator } from '@/lib/validators/position';
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

    const { name, electionId } = PositionValidator.parse(body);

    const position = await prisma.position.create({
      data: {
        name,
        electionId,
      },
    });

    await createAuditLog({
      action: 'CREATE',
      entityId: position.id,
      entityType: 'POSITION',
      entityName: position.name,
    });

    return new Response(position.id, { status: 201 });
  } catch (error) {
    console.log('[CREATE_POSITION_ERROR]', error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
