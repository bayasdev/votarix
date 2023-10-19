import { z } from 'zod';
import { hash } from 'bcrypt';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { UserValidator } from '@/lib/validators/user';

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

    return new Response(user.id, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
