"use client";

import Image from "next/image";
import { useState } from "react";
import galleryData from "@/src/lib/app/data/gallery.json";
import CarouselController from "@/src/ui/components/ui/CarouselController";

const LayoutGallery = () => {
  const images = galleryData.gallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastIndex = activeIndex + 1 === images.length;

  return (
    <div className="relative">
      <Image
        fill
        src={images[activeIndex].path}
        alt={images[activeIndex].alt}
        className="object-cover brightness-50"
      />

      {!isLastIndex && (
        <Image
          fill
          loading="eager"
          src={images[activeIndex + 1].path}
          alt={images[activeIndex + 1].alt}
          className="object-cover brightness-50 sr-only"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 flex items-end layout-padding text-white">
        {/* Wraper */}
        <div className="space-y-4">
          {/* Information */}
          <div>
            <h1 className="text-2xl font-bold">{images[activeIndex].title}</h1>
            <p className="text-sm font-light">
              {images[activeIndex].description}
            </p>
          </div>

          {/* Controller */}
          <CarouselController
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            totalLength={images.length}
            progressProps={{
              className: "border border-white/25",
              indicatorClassName: "bg-white/80",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutGallery;
