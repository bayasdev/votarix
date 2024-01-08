import { Role } from '@prisma/client';
import { z } from 'zod';
import { hash } from 'bcrypt';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { UserValidator } from '@/lib/validators/user';
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

    const { name, email, document, role } = UserValidator.parse(body);

    const hashedPassword = await hash(document, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        document,
        hashedPassword,
        role: role as Role,
      },
    });

    await createAuditLog({
      action: 'CREATE',
      entityId: user.id,
      entityType: 'USER',
      entityName: user.name,
    });

    return new Response(user.id, { status: 201 });
  } catch (error) {
    console.log('[CREATE_USER_ERROR]', error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
