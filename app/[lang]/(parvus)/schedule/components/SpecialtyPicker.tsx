"use client";

import { motion } from "motion/react";
import { SPECIALTIES, SPECIALTY_METADATAS } from "@/src/lib/app";
import { useScheduleStore } from "../scheduleStore";

const SpecialtyPicker = () => {
  const { selectedSpecialty, setSelectedSpecialty } = useScheduleStore();

  return (
    <motion.div
      initial={{ height: "auto" }}
      animate={selectedSpecialty ? { height: 0 } : { height: "auto" }}
      className="overflow-hidden"
    >
      <div className="md:p-4 md:border md:rounded-2xl space-y-4 w-full">
        <h2 className="font-semibold">What Do You Need?</h2>

        <div className="grid grid-cols-2 gap-2">
          {SPECIALTIES.map((s) => {
            const Icon = SPECIALTY_METADATAS[s].icon;
            return (
              <button
                type="button"
                key={s}
                className="text-xs flex items-center justify-start gap-2 px-3 py-2 border rounded-full hover:bg-foreground hover:text-background transition-all duration-200 active:scale-95"
                onClick={() => setSelectedSpecialty(s)}
              >
                <Icon className="w-6 h-6" />
                <span className="line-clamp-1 flex-1 text-start">
                  {SPECIALTY_METADATAS[s].name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialtyPicker;
