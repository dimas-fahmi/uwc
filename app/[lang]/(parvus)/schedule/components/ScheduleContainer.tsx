import {
  addDays,
  format,
  getDay,
  isBefore,
  isToday,
  startOfTomorrow,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  SPECIALTIES,
  SPECIALTY_METADATAS,
  type Specialty,
} from "@/src/lib/app";
import doctorsData from "@/src/lib/app/data/doctors.json";
import { authClient } from "@/src/lib/auth/client";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { useScheduleStore } from "../scheduleStore";

const ScheduleContainer = () => {
  const { selectedSpecialty, setSelectedSpecialty } = useScheduleStore();
  const currentWeekStart = useMemo(() => startOfWeek(new Date()), []);
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(startOfTomorrow()),
  );
  const [selectedDate, setSelectedDate] = useState<Date>(startOfTomorrow());

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const availableDoctors = useMemo(() => {
    if (!selectedSpecialty) return [];
    const jsDay = getDay(selectedDate);
    const dayLookup = jsDay === 0 ? 7 : jsDay;
    return doctorsData.doctors.filter((doc) => {
      const matchesSpecialty =
        doc.specialty === SPECIALTY_METADATAS[selectedSpecialty].name;
      const isAvailable = doc.schedule.some(
        (s) => s.day_number_in_week === dayLookup,
      );
      return matchesSpecialty && isAvailable;
    });
  }, [selectedSpecialty, selectedDate]);

  const handleNextWeek = () => {
    const newSelected = addDays(selectedDate, 7);
    setSelectedDate(newSelected);
    setWeekStart(startOfWeek(newSelected));
  };

  const handleBackToCurrent = () => {
    setSelectedDate(startOfTomorrow());
    setWeekStart(startOfWeek(startOfTomorrow()));
  };

  const isCurrentWeek = weekStart.getTime() === currentWeekStart.getTime();

  const router = useRouter();

  const params = useSearchParams();
  const state = params.get("state");

  useEffect(() => {
    if (!state) return;
    const [department, sd] = state.split("-s-");

    if (department && SPECIALTIES.includes(department as Specialty)) {
      setSelectedSpecialty(department as Specialty);
    }

    console.log(sd);
    const sdParsed = new Date(Number(sd));
    console.log(sdParsed);

    if (selectedDate && !Number.isNaN(sdParsed)) {
      setWeekStart(startOfWeek(sdParsed));
      setSelectedDate(sdParsed);
    }
  }, [state]);

  const { data: auth, isPending } = authClient.useSession();

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={
        selectedSpecialty
          ? { height: "auto", opacity: 1 }
          : { height: 0, opacity: 0 }
      }
      className="overflow-hidden"
    >
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          type="button"
          className="border rounded-full disabled:opacity-50 flex items-center gap-2 p-1 justify-center text-xs"
          disabled={isCurrentWeek}
          onClick={() => handleBackToCurrent()}
        >
          <ChevronLeft className="w-5 h-5" /> <span>Back to today</span>
        </button>
        <button
          type="button"
          className="border rounded-full flex items-center gap-2 p-1 justify-center text-xs"
          onClick={() => handleNextWeek()}
        >
          <ChevronRight className="w-5 h-5" /> <span>Next Week</span>
        </button>
      </div>

      {/* 7-Day Carousel */}
      <div className="grid grid-cols-7 gap-1 overflow-x-auto no-scrollbar mb-4">
        {weekDays.map((date) => {
          const isSelected =
            format(date, "yyMMdd") === format(selectedDate, "yyMMdd");
          return (
            <Tooltip key={date.toISOString()}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`py-4 rounded-md md:rounded-2xl border flex flex-col items-center transition-all duration-300 disabled:opacity-50 ${
                    isSelected && !isToday(date)
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "not-disabled:hover:bg-muted/20 scale-95"
                  } ${isToday(date) ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}`}
                  disabled={isBefore(date, new Date())}
                >
                  <span className="text-xs uppercase font-bold">
                    {isToday(date) ? "NOW" : format(date, "EEE")}
                  </span>
                  <span className="md:text-xl font-black">
                    {format(date, "d")}
                  </span>
                </button>
              </TooltipTrigger>
              {isToday(date) && (
                <TooltipContent>
                  Can't book an appointment for today
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 gap-4 overflow-hidden">
        <AnimatePresence>
          {availableDoctors.length > 0 ? (
            availableDoctors.map((d) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={d.code}
                className="p-4 border rounded-xl shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={50}
                    height={50}
                    src={`/res/arts/${d.image}`}
                    className="w-16 h-16 rounded-full object-cover bg-muted"
                    alt={d.name}
                    quality={50}
                  />
                  <div>
                    <h4 className="text-lg font-bold leading-6">{d.name}</h4>
                    <p className="text-xs font-light mb-2">{d.specialty}</p>
                    <p className="text-xs opacity-50 mt-1">
                      Available:{" "}
                      {
                        d.schedule.find(
                          (s) =>
                            s.day_number_in_week ===
                            (getDay(selectedDate) || 7),
                        )?.from
                      }{" "}
                      -{" "}
                      {
                        d.schedule.find(
                          (s) =>
                            s.day_number_in_week ===
                            (getDay(selectedDate) || 7),
                        )?.to
                      }
                    </p>
                  </div>
                </div>

                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="disabled:animate-pulse"
                  onClick={() => {
                    if (!auth?.user) {
                      const p = new URLSearchParams({
                        state: `${selectedSpecialty}-s-${selectedDate.getTime()}`,
                      });
                      router.push(`/signin?redTo=/schedule?${p.toString()}`);
                    } else {
                      router.push(
                        `/appointments/new?department=${selectedSpecialty}&date=${selectedDate.getTime()}&id=${d.code}`,
                      );
                    }
                  }}
                  disabled={isPending}
                >
                  Book
                </Button>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              No doctors available for this date.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ScheduleContainer;
