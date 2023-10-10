import { Candidate, Election, Party, Position, User } from '@prisma/client';

type SafeEntity<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = SafeEntity<User> & {
  emailVerified: string | null;
};

export type SafeParty = SafeEntity<Party>;
export type SafePosition = SafeEntity<Position>;
export type SafeCandidate = SafeEntity<Candidate>;
export type SafeElection = SafeEntity<Election> & {
  startTime: string;
  endTime: string;
};
