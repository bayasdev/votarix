'use client';

import { useRef } from 'react';

import { useProposalsStore } from '@/hooks/use-proposals-store';
import { CandidateProposal } from '@/types';

function ProposalsInitializer({
  proposals,
}: {
  proposals: CandidateProposal[];
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useProposalsStore.setState({ proposals });
    initialized.current = true;
  }
  return null;
}

export default ProposalsInitializer;
