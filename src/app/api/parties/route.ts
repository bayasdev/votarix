import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { name, photo } = body;

  if (!name) {
    return NextResponse.error();
  }

  const party = await prisma.party.create({
    data: {
      name,
      photo,
    },
  });

  return NextResponse.json(party);
}
