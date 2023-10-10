import { create } from 'zustand';

interface useAlertModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAlertModal = create<useAlertModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
