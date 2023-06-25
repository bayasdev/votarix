import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/db';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { name, email, document, bio, proposals, photo, partyId } = body;

  if (!name) {
    return NextResponse.error();
  }

  const candidate = await prisma.candidate.create({
    data: {
      name,
      email,
      document,
      bio,
      proposals,
      photo,
      partyId,
    },
  });

  return NextResponse.json(candidate);
}
