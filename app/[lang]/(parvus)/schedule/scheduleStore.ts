import { create } from "zustand";
import type { Specialty } from "@/src/lib/app";

export interface ScheduleStore {
  selectedSpecialty: Specialty | null;
  setSelectedSpecialty: (specialty: ScheduleStore["selectedSpecialty"]) => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  selectedSpecialty: null,
  setSelectedSpecialty: (nv) => set({ selectedSpecialty: nv }),
}));
