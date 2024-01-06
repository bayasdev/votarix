import {
  User,
  Role,
  Election,
  Position,
  Party,
  Candidate,
  AuditLog,
} from '@prisma/client';

import { Icons } from '@/components/shared/icons';
import { ElectionStatus } from '@/constants';

// ui

export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
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

export type SafeUser = Safe<User>;

export type SafeUserWithHasVoted = SafeUser & {
  hasVoted: boolean;
};

export type SafeElection = Safe<Omit<Election, 'startsAt' | 'endsAt'>> & {
  startsAt: string;
  endsAt: string;
};

export type SafePosition = Safe<Position>;

export type SafePositionWithElection = Safe<Position> & {
  electionName: string;
};

export type SafeParty = Safe<Omit<Party, 'proposals'>> & {
  proposals: string;
};

export type PartyProposal = {
  name?: string;
  description?: string;
};

export type SafePartyWithPositionAndElection = SafeParty & {
  positionName: string;
  electionName: string;
};

export type SafeCandidate = Safe<Candidate>;

export type SafeCandidateWithPartyAndPositionAndElection = SafeCandidate & {
  partyName: string;
  positionName: string;
  electionName: string;
};

export type SafeElectionWithStatus = SafeElection & {
  status: ElectionStatus;
};

export type SafeAuditLog = Safe<AuditLog>;

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
  startsAt: string;
  endsAt: string;
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
  startsAt: string;
  endsAt: string;
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
