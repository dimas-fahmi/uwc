"use client";

import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

const Header = () => {
  return (
    <header className="space-y-6 p-4 md:p-12">
      <h1 className="text-4xl font-bold">Services</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-6">
          {/* Stats */}
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">20+</span>
            <p className="text-xs">Services</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">16+</span>
            <p className="text-xs">Spesialists</p>
          </div>
        </div>

        <p>
          Explore our comprehensive range of services — from dentistry and
          dermatology to physiotherapy and pediatrics — thoughtfully designed to
          support your health at every stage of life.
        </p>
      </div>
    </header>
  );
};

const ServicesSection = () => {
  return (
    <section id="services">
      <Header />
      <DesktopContainer />
      <MobileContainer />
    </section>
  );
};

export default ServicesSection;
