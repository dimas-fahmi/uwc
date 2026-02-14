"use client";

import Image from "next/image";

const StorySection = () => {
  return (
    <section className="min-w-vw max-w-vw min-h-dvh max-h-dvh relative">
      <Image
        width={1920}
        height={1280}
        src={"/res/arts/uwc-02.jpg"}
        alt="Story Cover"
        className="min-w-vw max-w-vw min-h-dvh max-h-dvh object-cover brightness-50"
      />

      <div className="absolute inset-0 layout-padding text-white max-w-lg space-y-6">
        <h1 className="text-4xl font-bold">
          UWC's Heroes: Stories of Health and Healing
        </h1>

        <p className="font-extralight">
          Discover inspiring journeys of wellness and recovery from our valued
          patients at UWC
        </p>
      </div>
    </section>
  );
};

export default StorySection;
