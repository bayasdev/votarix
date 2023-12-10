import { create } from 'zustand';

import { SafeUser } from '@/types';

interface AddVotersModalStore {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void;
  rowSelection: {};
  // eslint-disable-next-line no-unused-vars
  setRowSelection: (value: {}) => void;
  selectedData: SafeUser[];
  // eslint-disable-next-line no-unused-vars
  setSelectedData: (value: SafeUser[]) => void;
}

export const useAddVotersModalStore = create<AddVotersModalStore>(
  (set, get) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    rowSelection: {},
    setRowSelection: (state) => {
      set({
        rowSelection:
          typeof state === 'function' ? state(get().rowSelection) : state,
      });
    },
    selectedData: [],
    setSelectedData: (value) => set(() => ({ selectedData: value })),
  }),
);
