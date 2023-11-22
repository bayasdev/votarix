import { create } from 'zustand';

interface MobileMenuStore {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
