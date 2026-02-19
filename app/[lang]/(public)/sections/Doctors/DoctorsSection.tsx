"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SPECIALTIES, SPECIALTY_METADATAS } from "@/src/lib/app";
import doctorsData from "@/src/lib/app/data/doctors.json";
import RenderMetadata from "@/src/ui/components/ui/RenderMetadata";
import StarRating from "@/src/ui/components/ui/StarRating";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/src/ui/shadcn/components/ui/popover";
import { Progress } from "@/src/ui/shadcn/components/ui/progress";
import { ScrollArea } from "@/src/ui/shadcn/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { useDoctorStore } from "./DoctorStore";

const Header = () => {
  const { filter, setFilter, setActiveIndex } = useDoctorStore();
  const [open, onOpenChange] = useState(false);

  return (
    <header className="space-y-4 border-b pb-6">
      <h1 className="text-4xl font-bold">Doctors</h1>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* Controller */}
        <div className="flex-1 w-full md:w-fit">
          <Popover {...{ open, onOpenChange }}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className=" px-6 py-2 bg-muted/50 shadow-md rounded-full flex items-center justify-between gap-4 text-xs md:min-w-72 w-full md:w-fit"
                onClick={() => onOpenChange(true)}
              >
                {filter || "Specialty"}
                <span className="p-2 w-8 h-8 bg-muted shadow-lg flex items-center justify-center border rounded-full">
                  <ChevronDown size={16} />
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <header className="border-b pb-2">
                <PopoverTitle>Specialty Filter</PopoverTitle>
                <PopoverDescription className="text-xs">
                  Filter doctors by their specialty
                </PopoverDescription>
              </header>

              {/* State */}
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="uppercase text-xs">Filter</h4>
                  <p className="font-light text-sm">
                    {filter || "No Active Filter"}
                  </p>
                </div>

                <Button
                  variant={"outline"}
                  onClick={() => {
                    setActiveIndex(0);
                    setFilter(null);
                  }}
                  disabled={!filter}
                  size={"xs"}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>

              {/* Filters */}
              <ScrollArea className="h-48 pe-4 overflow-y-scroll scrollbar-none">
                <div className="grid grid-cols-1 gap-2 border-b pb-2">
                  {SPECIALTIES.map((s) => {
                    const Icon = SPECIALTY_METADATAS[s].icon;
                    return (
                      <button
                        type="button"
                        key={s}
                        disabled={filter === s}
                        onClick={() => {
                          setActiveIndex(0);
                          setFilter(
                            filter === SPECIALTY_METADATAS[s].name
                              ? null
                              : SPECIALTY_METADATAS[s].name,
                          );
                          onOpenChange(false);
                        }}
                        className={`text-start flex items-center gap-2 text-xs border py-2 px-4 rounded-lg ${filter === SPECIALTY_METADATAS[s].name ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        <Icon className="w-5 h-5" />
                        {SPECIALTY_METADATAS[s].name}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        <p className="max-w-lg">
          Meet our medical expert professionals dedicated to providing
          compassionate and personalized healthcare services.
        </p>
      </div>
    </header>
  );
};

const DoctorsSection = () => {
  const { filter, activeIndex, setActiveIndex } = useDoctorStore();
  const doctors = filter
    ? doctorsData.doctors.filter((d) => d.specialty === filter)
    : doctorsData.doctors;
  const isLastIndex = doctors.length - 1 === activeIndex;
  const isDesktop = useMediaQuery({
    query: `(min-width: 48rem)`,
  });

  return (
    <section id="doctors" className="layout-padding">
      <Header />

      {doctors[activeIndex] && (
        <div className="flex flex-col-reverse md:grid grid-cols-2 gap-12 mt-6 md:max-h-[380px]">
          {/* Content */}
          <div className="flex flex-col gap-4 flex-1">
            <StarRating min={5} max={5} />

            <AnimatePresence mode="wait">
              <motion.div
                key={doctors[activeIndex].name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h1 className="text-3xl md:text-4xl font-bold line-clamp-1">
                      {doctors[activeIndex].name}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent>{doctors[activeIndex].name}</TooltipContent>
                </Tooltip>

                <ScrollArea className="max-h-35 pe-4 overflow-y-scroll scrollbar-none">
                  <p className="whitespace-pre-wrap">
                    {doctors[activeIndex].biography}
                  </p>
                </ScrollArea>
              </motion.div>
            </AnimatePresence>

            <div className="flex-1 flex items-end">
              {/* Wrapper */}
              <div className="space-y-4 w-full">
                {/* Metadata */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={doctors[activeIndex].name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RenderMetadata
                      metadatas={[
                        {
                          title: "Position",
                          value: doctors[activeIndex].specialty,
                        },
                        { title: "Age", value: `${doctors[activeIndex].age}` },
                        {
                          title: "Country",
                          value: (
                            <span className="uppercase">
                              {doctors[activeIndex].country}
                            </span>
                          ),
                        },
                        { title: "Code", value: doctors[activeIndex].code },
                      ]}
                      borderIndex={isDesktop ? [1, 2, 3] : [1, 3]}
                      className="grid grid-cols-2 md:flex md:overflow-x-scroll no-scrollbar md:pb-4"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Controller */}
                <div className="flex items-center gap-4">
                  {/* Prev Button */}
                  <button
                    type="button"
                    className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                    disabled={activeIndex === 0}
                    onClick={() => {
                      setActiveIndex(activeIndex - 1);
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* State */}
                  <span>
                    {String(activeIndex + 1).padStart(2, "0")}/
                    {String(doctors.length).padStart(2, "0")}
                  </span>

                  {/* Next Button */}
                  <button
                    type="button"
                    className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full border flex items-center justify-center"
                    onClick={() => {
                      if (isLastIndex) {
                        setActiveIndex(0);
                      } else {
                        setActiveIndex(activeIndex + 1);
                      }
                    }}
                  >
                    {isLastIndex ? (
                      <RotateCcw className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  <Progress
                    value={((activeIndex + 1) / doctors.length) * 100}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={doctors[activeIndex].image}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex max-h-[380px] items-center justify-end relative"
            >
              <Image
                width={1080}
                height={1080}
                src={`https://uwc-nine.vercel.app/res/arts/${doctors[activeIndex].image}`}
                alt="Dr. Adrian Pratama"
                className="rounded-2xl w-full h-full object-cover aspect-square border shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default DoctorsSection;
