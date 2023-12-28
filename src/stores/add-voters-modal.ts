import { create } from 'zustand';

import { SafeUser } from '@/types';

interface AddVotersModalStore {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void;
  selectedRows: {};
  // eslint-disable-next-line no-unused-vars
  setSelectedRows: (selectedRows: {}) => void;
  selectedData: SafeUser[];
  // eslint-disable-next-line no-unused-vars
  setSelectedData: (selectedData: SafeUser[]) => void;
}

export const useAddVotersModalStore = create<AddVotersModalStore>(
  (set, get) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    selectedRows: {},
    setSelectedRows: (selectedRows) => {
      set({
        selectedRows:
          typeof selectedRows === 'function'
            ? selectedRows(get().selectedRows)
            : selectedRows,
      });
    },
    selectedData: [],
    setSelectedData: (selectedData) => set(() => ({ selectedData })),
  }),
);
