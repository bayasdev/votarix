import { Candidate, Election, Party, Position, User } from '@prisma/client';

type Safe<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

type NonNullable<T> = T extends null | undefined ? never : T;

export type SafeUser = Without<Safe<User>, 'emailVerified'> & {
  emailVerified: NonNullable<string>;
};

export type SafeElection = Without<Safe<Election>, 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};
export type SafePosition = Safe<Position>;

export type SafePositionWithElection = Without<SafePosition, 'election'> & {
  election?: SafeElection;
};

export type SafeParty = Safe<Party>;

export type SafeCandidate = Safe<Candidate>;

export type SafeCandidateWithParty = Without<SafeCandidate, 'party'> & {
  party?: SafeParty;
};
