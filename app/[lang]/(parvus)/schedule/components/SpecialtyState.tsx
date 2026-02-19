import { InfoIcon, Trash } from "lucide-react";
import { motion } from "motion/react";
import { SPECIALTY_METADATAS } from "@/src/lib/app";
import { useScheduleStore } from "../scheduleStore";

const SpecialtyState = () => {
  const { selectedSpecialty, setSelectedSpecialty } = useScheduleStore();

  const Icon = selectedSpecialty
    ? SPECIALTY_METADATAS[selectedSpecialty].icon
    : InfoIcon;

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={selectedSpecialty ? { height: "auto" } : { height: 0 }}
      className="overflow-hidden"
    >
      <div className="p-4 rounded-2xl border flex items-center justify-between mb-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Icon />

          <span>
            {selectedSpecialty
              ? SPECIALTY_METADATAS[selectedSpecialty].name
              : "No Specialty Selected"}
          </span>
        </div>

        <button
          type="button"
          className="p-1 w-8 h-8 rounded-full border flex items-center justify-center"
          onClick={() => setSelectedSpecialty(null)}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default SpecialtyState;
