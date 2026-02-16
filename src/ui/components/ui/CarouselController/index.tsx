"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Progress,
  type ProgressProps,
} from "@/src/ui/shadcn/components/ui/progress";

export interface CarouselControllerProps {
  activeIndex?: number;
  setActiveIndex?: (number: number) => void;
  totalLength?: number;
}

const CarouselController = ({
  activeIndex,
  setActiveIndex,
  totalLength,
  progressProps,
}: CarouselControllerProps & { progressProps?: ProgressProps }) => {
  const isLastIndex =
    totalLength && typeof activeIndex === "number"
      ? activeIndex + 1 === totalLength
      : true;

  return (
    <div className="flex items-center gap-4">
      {/* Prev Button */}
      <button
        type="button"
        className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
        disabled={activeIndex === 0 || !setActiveIndex || !activeIndex}
        onClick={() => {
          if (typeof activeIndex !== "number" || !setActiveIndex) return;
          setActiveIndex(activeIndex - 1);
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* State */}
      <span>
        {typeof activeIndex === "number"
          ? String(activeIndex + 1).padStart(2, "0")
          : "00"}
        /{totalLength ? String(totalLength).padStart(2, "0") : "00"}
      </span>

      {/* Next Button */}
      <button
        type="button"
        className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
        disabled={isLastIndex}
        onClick={() => {
          if (typeof activeIndex !== "number" || !setActiveIndex) return;

          setActiveIndex(activeIndex + 1);
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <Progress
        value={(((activeIndex || 0) + 1) / (totalLength || 0)) * 100}
        {...progressProps}
      />
    </div>
  );
};

export default CarouselController;
