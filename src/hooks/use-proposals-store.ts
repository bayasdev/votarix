/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { CandidateProposal } from '@/types';

interface ProposalsStore {
  proposals: CandidateProposal[];
  addProposal: (proposal: CandidateProposal) => void;
  updateProposal: (index: number, proposal: CandidateProposal) => void;
  removeProposal: (index: number) => void;
}

export const useProposalsStore = create<ProposalsStore>((set) => ({
  proposals: [],
  addProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),
  updateProposal: (index, proposal) =>
    set((state) => {
      const proposals = [...state.proposals];
      proposals[index] = proposal;
      return { proposals };
    }),
  removeProposal: (index) =>
    set((state) => ({
      proposals: state.proposals.filter((_, i) => i !== index),
    })),
}));
