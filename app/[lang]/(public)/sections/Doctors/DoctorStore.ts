import { create } from "zustand";

export interface DoctorStore {
  filter: string | null;
  setFilter: (filter: string | null) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
  filter: null,
  setFilter: (nv) => set({ filter: nv }),

  activeIndex: 0,
  setActiveIndex: (nv) => set({ activeIndex: nv }),
}));
