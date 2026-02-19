import {
  Baby,
  Brain,
  Ear,
  Eye,
  HeartPulse,
  type LucideIcon,
  Smile,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export const SPECIALTIES = [
  "otolaryngologist",
  "general_practitioner",
  "cardiologist",
  "pediatrics",
  "dentist",
  "dermatologist",
  "ophthalmologist",
  "psychiatrist",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

export interface SpecialtyMetadata {
  name: string;
  icon: LucideIcon;
}

export const SPECIALTY_METADATAS = {
  otolaryngologist: {
    name: "Otolaryngologist",
    icon: Ear,
  },
  general_practitioner: {
    name: "General Practitioner",
    icon: Stethoscope,
  },
  cardiologist: {
    name: "Cardiologist",
    icon: HeartPulse,
  },
  pediatrics: {
    name: "Pediatrics",
    icon: Baby,
  },
  dentist: {
    name: "Dentist",
    icon: Smile,
  },
  dermatologist: {
    name: "Dermatologist",
    icon: Sparkles,
  },
  ophthalmologist: {
    name: "Ophthalmologist",
    icon: Eye,
  },
  psychiatrist: {
    name: "Psychiatrist",
    icon: Brain,
  },
} satisfies Record<Specialty, SpecialtyMetadata>;
