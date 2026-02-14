"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import servicesData from "@/src/lib/app/data/services.json";
import { ServiceCard } from "@/src/ui/components/ui/ServiceCard";
import { Progress } from "@/src/ui/shadcn/components/ui/progress";

const MobileContainer = () => {
  const services = servicesData.services;
  const itemsPerPage = 2;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleServices = services.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "105%" : "-105%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-105%" : "105%",
      opacity: 0.5,
    }),
  };

  return (
    <div className="block md:hidden layout-padding space-y-6 mt-6">
      {/* Cards Container */}
      <div className="relative overflow-hidden min-h-[480px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-4 absolute inset-0 w-full"
          >
            {visibleServices.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div>
        <Progress value={((currentPage + 1) / totalPages) * 100} />
      </div>

      {/* Controller */}
      <div className="flex items-center justify-center gap-4">
        {/* Prev Button */}
        <button
          type="button"
          className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* State */}
        <span>
          {String(currentPage + 1).padStart(2, "0")}/
          {String(totalPages).padStart(2, "0")}
        </span>

        {/* Next Button */}
        <button
          type="button"
          className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MobileContainer;
