import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/db';

interface IParams {
  params: {
    candidateId?: string;
  };
}

export async function PUT(request: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return NextResponse.error();
  }

  const { candidateId } = params;

  if (!candidateId || typeof candidateId !== 'string') {
    throw new Error('Invalid Id');
  }

  const candidate = await prisma.candidate.delete({
    where: {
      id: candidateId,
    },
  });

  return NextResponse.json(candidate);
}
