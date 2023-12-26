import { create } from 'zustand';

interface MobileNavStore {
  isMobileNavOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsMobileNavOpen: (isMobileNavOpen: boolean) => void;
}

export const useMobileNavStore = create<MobileNavStore>((set) => ({
  isMobileNavOpen: false,
  setIsMobileNavOpen: (isMobileNavOpen) => set({ isMobileNavOpen }),
}));
