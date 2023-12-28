import {
  Candidate,
  Election,
  Party,
  Position,
  User,
  Role,
} from '@prisma/client';

import { Icons } from '@/components/shared/icons';
import { ElectionStatus } from '@/constants';

// ui

export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  role?: Role;
};

export type SidebarNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
};

// configs

export type TribunalMember = {
  name: string;
  title: string;
  imageUrl?: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  organizationName: string;
  organizationAbbreviation: string;
  organizationUrl: string;
  organizationAddress: string;
  organizationEmail: string;
  signupAllowed: boolean;
  tribunalMembers: TribunalMember[];
};

export type LandingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

type Safe<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Safe<Omit<User, 'emailVerified'>> & {
  emailVerified: string | null;
};

export type SafeUserWithHasVoted = SafeUser & {
  hasVoted: boolean;
};

export type SafeParty = Safe<Party>;

export type SafeCandidate = Omit<Safe<Candidate>, 'proposals'> & {
  proposals?: string;
};

export type SafeCandidateWithParty = Omit<SafeCandidate, 'party'> & {
  party?: SafeParty;
};

export type SafeElection = Safe<Omit<Election, 'startTime' | 'endTime'>> & {
  startTime: string;
  endTime: string;
};

export type SafeElectionWithStatus = SafeElection & {
  status: ElectionStatus;
};

export type SafePosition = Safe<Position>;

export type SafePositionWithElection = Omit<SafePosition, 'election'> & {
  election?: SafeElection;
};

export type CandidateProposal = {
  name?: string;
  description?: string;
};

export type CertificateResponse = {
  id: string;
  electionName: string;
  voterName: string;
  voterDocument?: string;
};

export type ElectionResultsCandidate = {
  id: string;
  name: string;
  imageUrl?: string;
  party: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  votes: number;
  percentage: number;
};

export type ElectionResultsPosition = {
  id: string;
  name: string;
  candidates: ElectionResultsCandidate[];
  validVotes: number;
  nullVotes: number;
  blankVotes: number;
};

export type ElectionResults = {
  electionId: string;
  electionName: string;
  startTime: string;
  endTime: string;
  positions: ElectionResultsPosition[];
  totalVoters: number;
  totalVotes: number;
  absentVoters: number;
  absentPercentage: number;
  status: ElectionStatus;
  updatedAt: string;
};

export type ElectionDataCandidate = {
  id: string;
  name: string;
  alternateCandidateName: string;
  imageUrl?: string;
  party: {
    id: string;
    name: string;
    imageUrl?: string;
  };
};

export type ElectionDataPosition = {
  id: string;
  name: string;
  candidates: ElectionDataCandidate[];
};

export type ElectionData = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  positions: ElectionDataPosition[];
};

export type ElectionDataWithProposals = Omit<ElectionData, 'positions'> & {
  positions: (Omit<ElectionDataPosition, 'candidates'> & {
    candidates: (Omit<ElectionDataCandidate, 'proposals'> & {
      proposals: string;
    })[];
  })[];
};

export type DashboardData = {
  totalUsers: number;
  totalElections: number;
  totalActiveElections: number;
  totalCandidates: number;
  totalParties: number;
  totalCertificates: number;
};
