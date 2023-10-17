import { Candidate, Election, Party, Position, User } from '@prisma/client';
// eslint-disable-next-line no-unused-vars
import type { Icon } from 'lucide-react';

import { Icons } from '@/components/icons';

// ui

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

// configs

export type SiteConfig = {
  name: string;
  description: string;
  version: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  signupAllowed: boolean;
};

export type LandingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// safe generic

type Safe<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

// prisma

export type SafeUser = Safe<Omit<User, 'emailVerified'>> & {
  emailVerified: string | null;
};

type SafeUserWithHasVoted = SafeUser & {
  hasVoted: boolean;
};

export type SafeParty = Safe<Party>;

export type SafePosition = Safe<Position>;

export type SafeCandidate = Safe<Candidate>;

export type SafeElection = Safe<Omit<Election, 'startTime' | 'endTime'>> & {
  startTime: string;
  endTime: string;
};

export type SafeElectionWithStatus = SafeElection & {
  status: boolean;
};

export type SafePositionWithElection = Omit<SafePosition, 'election'> & {
  election?: SafeElection;
};

export type SafeCandidateWithParty = Omit<SafeCandidate, 'party'> & {
  party?: SafeParty;
};

export type ElectionResult = {
  electionId: string;
  positionName: string;
  candidateName: string;
  candidateImageUrl: string;
  partyName: string;
  partyImageUrl: string;
  voteCount: number;
};

export type ElectionData = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  positions: {
    id: string;
    name: string;
    candidates: {
      id: string;
      name: string;
      imageUrl?: string;
      party: {
        id: string;
        name: string;
        imageUrl?: string;
      };
    }[];
  }[];
};
