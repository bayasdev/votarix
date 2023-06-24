import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { name, email, document, bio, photo } = body;

  if (!name) {
    return NextResponse.error();
  }

  const candidate = await prisma.candidate.create({
    data: {
      name,
      email,
      document,
      bio,
      photo,
    },
  });

  return NextResponse.json(candidate);
}
