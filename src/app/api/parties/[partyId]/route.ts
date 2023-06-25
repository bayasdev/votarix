import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/db';

interface IParams {
  params: {
    partyId?: string;
  };
}

export async function PUT(request: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const { partyId } = params;

  const body = await request.json();

  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(party);
}

export async function DELETE(request: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const { partyId } = params;

  if (!partyId || typeof partyId !== 'string') {
    throw new Error('Invalid Id');
  }

  const party = await prisma.party.delete({
    where: {
      id: partyId,
    },
  });

  return NextResponse.json(party);
}
