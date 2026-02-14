import { create } from "zustand";

export interface OFSDStore {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const useOFSDStore = create<OFSDStore>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
