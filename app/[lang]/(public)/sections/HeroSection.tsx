"use client";

import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import StarRating from "@/src/ui/components/ui/StarRating";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { cn } from "@/src/ui/shadcn/lib/utils";

const Mtd = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}
    >
      {/* Card */}
      <div className="text-xs border-r pe-4">
        <h1 className="opacity-50">Lokasi</h1>
        <p>Jl. Asia-Afrika, Bandung</p>
      </div>
      <div className="text-xs hidden md:block border-r pe-4">
        <h1 className="opacity-50">Layanan</h1>
        <p>Premium Wellness</p>
      </div>
      <div className="text-xs">
        <h1 className="opacity-50">Penilaian</h1>
        <StarRating min={5} max={5} size={13} />
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="grid md:grid-cols-2 p-4 md:p-12 md:min-h-[480px] overflow-hidden">
      {/* Content */}
      <div className="flex items-center h-fit">
        {/* Wrapper */}
        <div className="md:max-w-md space-y-8">
          <h1 className="text-4xl font-bold">
            Redefining the Art of{" "}
            <span className="text-primary">Healthy Living.</span>
          </h1>
          <p>
            Experience a new standard in personal healthcare. At Ultimacare
            Bandung, we combine the latest medical science with a holistic
            approach to help you look and feel your best every day.
          </p>

          {/* CTA */}
          <div className="space-x-0 md:space-x-2 grid grid-cols-1 md:flex">
            <Button size={"lg"}>
              <ArrowUpRight />
              Book an Appointment
            </Button>
            <Button size={"lg"} variant={"outline"} className="hidden md:flex">
              <Calendar />
              {`Doctor's Schedule`}
            </Button>
          </div>

          {/* Metadata */}
          <Mtd className="hidden md:flex" />
        </div>
      </div>

      {/* Ilo */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-8 md:gap-0">
        <div className="relative w-full md:w-[85%] min-h-[280px] h-full">
          <Image
            fill
            src={"/res/arts/uwc-01.png"}
            alt="UWC Asia Afrika"
            className="object-cover object-center rounded-2xl shadow-2xl h-full"
          />
        </div>

        {/* Metadata */}
        <Mtd className="grid md:hidden" />
      </div>
    </section>
  );
};

export default HeroSection;
