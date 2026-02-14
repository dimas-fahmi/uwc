"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import reviewsData from "@/src/lib/app/data/reviews.json";
import { Progress } from "@/src/ui/shadcn/components/ui/progress";
import ReviewCard from "./ReviewCard";

const Header = () => {
  const rating =
    reviewsData.reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviewsData.reviews.length;

  return (
    <header className="space-y-4 border-b pb-6 layout-padding">
      <h1 className="text-4xl font-bold">Reviews</h1>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* Controller */}
        <div className="flex items-center gap-6">
          <div>
            <span className="text-2xl md:text-4xl font-bold">
              {reviewsData.reviews.length}
            </span>{" "}
            <span className="text-sm font-light">Reviews</span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-bold">
              {rating.toFixed(1)}/5
            </span>{" "}
            <span className="text-sm font-light">Rating</span>
          </div>
        </div>

        <p className="max-w-lg">
          Read what our satisifed patiens have to say about their experiences
          with UWC Bandung.
        </p>
      </div>
    </header>
  );
};

const ReviewSection = () => {
  const reviews = reviewsData.reviews;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleReviews = reviews.slice(
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
    <section id="reviews">
      <Header />

      <div className="block space-y-6 mt-6 layout-padding overflow-hidden">
        {/* Cards Container */}
        <div className="relative min-h-[880px] md:min-h-[280px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 absolute inset-0 w-full"
            >
              {visibleReviews.map((r) => (
                <ReviewCard key={JSON.stringify(r)} review={r} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-4 items-center">
          {/* Progress */}
          <div className="w-full">
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
      </div>
    </section>
  );
};

export default ReviewSection;
