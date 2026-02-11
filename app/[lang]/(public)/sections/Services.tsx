"use client";

import ScrollContainer from "react-indiana-drag-scroll";
import serviceData from "@/src/lib/app/data/services.json";
import PointerFollower from "@/src/ui/components/ui/PointerFollower";
import { ServiceCard } from "@/src/ui/components/ui/ServiceCard";

const DesktopContainer = () => {
  return (
    <PointerFollower>
      <ScrollContainer className="flex items-center gap-4 overflow-x-scroll scrollbar-none px-4 md:px-12">
        {/* Card */}
        {serviceData.services.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </ScrollContainer>
    </PointerFollower>
  );
};

const Services = () => {
  return (
    <div>
      <header className="space-y-6 p-4 md:p-12">
        <h1 className="text-4xl font-bold">Services</h1>

        <div className="flex gap-6">
          <div className="flex gap-6">
            {/* Stats */}
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold">20+</span>
              <p className="text-xs">Services</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold">10+</span>
              <p className="text-xs">Spesialists</p>
            </div>
          </div>

          <p>
            Explore our comprehensive range of services — from dentistry and
            dermatology to physiotherapy and pediatrics — thoughtfully designed
            to support your health at every stage of life.
          </p>
        </div>
      </header>

      <div className="hidden md:block">
        <DesktopContainer />
      </div>
    </div>
  );
};

export default Services;
