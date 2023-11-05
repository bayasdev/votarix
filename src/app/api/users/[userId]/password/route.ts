import { z } from 'zod';
import { hash } from 'bcrypt';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { UserPasswordValidator } from '@/lib/validators/user';

interface IParams {
  params: {
    userId?: string;
  };
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const { password } = UserPasswordValidator.parse(await request.json());

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword,
      },
    });

    return new Response(user.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
