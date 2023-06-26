import { hash } from 'bcrypt';
import { z } from 'zod';

import prisma from '@/src/lib/prisma';
import { SignupValidator } from '@/src/lib/validators/auth';

export async function POST(request: Request) {
  try {
    if (process.env.SIGNUP_ALLOWED !== 'true') {
      return new Response('Opción deshabilitada', {
        status: 400,
      });
    }

    const body = await request.json();

    const { email, name, document, password } = SignupValidator.parse(body);

    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      return new Response('Usuario ya existe', {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: { email, name, document, hashedPassword },
    });

    return new Response('Cuenta creada correctamente');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
