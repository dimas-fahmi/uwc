"use client";

import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth/client";
import RenderMetadata from "@/src/ui/components/ui/RenderMetadata";
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
        <h1 className="opacity-50">Location</h1>
        <p>Jl. Asia-Afrika, Bandung</p>
      </div>
      <div className="text-xs hidden md:block border-r pe-4">
        <h1 className="opacity-50">Services</h1>
        <p>Premium Wellness</p>
      </div>
      <div className="text-xs">
        <h1 className="opacity-50">Rated</h1>
        <StarRating min={5} max={5} size={13} />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  return (
    <section
      id="hero"
      className="grid md:grid-cols-2 p-4 md:p-12 md:min-h-[480px] overflow-hidden"
    >
      {/* Content */}
      <div className="flex items-center h-fit">
        {/* Wrapper */}
        <div className="md:max-w-md space-y-8">
          <h1 className="text-4xl font-bold">
            Redefining the Art of{" "}
            <span className="text-primary">Healthy Living.</span>
          </h1>
          <p>
            Experience a new standard in personal healthcare. At UWC Bandung, we
            combine the latest medical science with a holistic approach to help
            you look and feel your best every day.
          </p>

          {/* CTA */}
          <div className="space-x-0 md:space-x-2 grid grid-cols-1 md:flex">
            <Button asChild size={"lg"}>
              <Link href={"/schedule"}>
                <ArrowUpRight />
                Book an Appointment
              </Link>
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              className="hidden md:flex"
              disabled={isPending}
              onClick={() => {
                if (!session) {
                  router.push("/signin");
                } else {
                  router.push("/appointments");
                }
              }}
            >
              <Calendar />
              My Appointments
            </Button>
          </div>

          {/* Metadata */}
          <Mtd className="hidden md:flex" />
        </div>
      </div>

      {/* Ilo */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-8 md:gap-0 mb-8 md:mb-0">
        <div className="relative w-full md:w-[85%] min-h-[280px] md:min-h-0 md:h-full">
          <Image
            fill
            loading="eager"
            src={"/res/arts/uwc-01.png"}
            alt="UWC Asia Afrika"
            className="object-cover rounded-2xl shadow-2xl h-full"
          />
        </div>
      </div>

      <RenderMetadata
        metadatas={[
          {
            title: "Location",
            value: "JL. Asia-Afrika, Bandung",
          },
          {
            title: "Service",
            value: "Premium Wellness",
          },
        ]}
        borderIndex={[1]}
        className="flex md:hidden"
      />
    </section>
  );
};

export default HeroSection;
