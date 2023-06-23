import { Candidate, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SafeCandidate = Omit<Candidate, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
