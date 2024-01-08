import {
  User,
  Role,
  Election,
  Position,
  Party,
  Candidate,
  AuditLog,
  CandidateType,
} from '@prisma/client';

import { Icons } from '@/components/shared/icons';

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

// safe generic

type Safe<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

// types

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

export type SafeAuditLog = Safe<AuditLog>;

export type CertificateResponse = {
  id: string;
  electionName: string;
  voterName: string;
  voterDocument: string;
};

export type ElectionDataResponse = {
  id: string;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  positions: ElectionDataPosition[];
};

export type ElectionDataPosition = {
  id: string;
  name: string;
  parties: ElectionDataParty[];
};

export type ElectionDataParty = {
  id: string;
  name: string;
  imageKey?: string;
  imageUrl?: string;
  candidates: ElectionDataCandidate[];
};

export type ElectionDataCandidate = {
  id: string;
  name: string;
  imageKey?: string;
  imageUrl?: string;
  type: CandidateType;
};

export type ElectionResultsResponse = {
  id: string;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  positions: ElectionResultsPosition[];
  registeredVoters: number;
  totalVoters: number;
  totalAbsentVoters: number;
  updatedAt: string;
};

export type ElectionResultsPosition = {
  id: string;
  name: string;
  parties: ElectionResultsParty[];
  totalVotes: number;
  totalValidVotes: number;
  totalNullVotes: number;
  totalBlankVotes: number;
};

export type ElectionResultsParty = {
  id: string;
  name: string;
  imageKey?: string;
  imageUrl?: string;
  candidates: ElectionResultsCandidate[];
  totalVotes: number;
  percentage: number;
};

export type ElectionResultsCandidate = {
  id: string;
  name: string;
  imageKey?: string;
  imageUrl?: string;
  type: CandidateType;
};

export type ElectionProposalsResponse = {
  id: string;
  name: string;
  positions: ElectionProposalsPosition[];
};

export type ElectionProposalsPosition = {
  id: string;
  name: string;
  parties: ElectionProposalsParty[];
};

export type ElectionProposalsParty = {
  id: string;
  name: string;
  imageKey?: string;
  imageUrl?: string;
  candidates: ElectionProposalsCandidate[];
  proposals: string;
};

export type ElectionProposalsCandidate = {
  id: string;
  name: string;
  imageKey?: string;
  imageUrl?: string;
  type: CandidateType;
};

export type DashboardDataResponse = {
  totalUsers: number;
  totalElections: number;
  totalActiveElections: number;
  totalCandidates: number;
  totalParties: number;
  totalCertificates: number;
};
