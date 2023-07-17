import { Candidate, Election, Party, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SafeParty = Omit<Party, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeCandidate = Omit<Candidate, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeElection = Omit<
  Election,
  'startTime' | 'endTime' | 'createdAt' | 'updatedAt'
> & {
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
