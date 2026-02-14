"use client";

import Image from "next/image";

export interface ServiceType {
  name: string;
  description: string;
  label: string[];
  image: string;
}

export const ServiceCard = ({ service }: { service: ServiceType }) => {
  return (
    <div className="relative min-w-[70%] max-h-[280px] overflow-hidden rounded-2xl select-none">
      {/* Backdrop */}
      <div>
        <Image
          width={720}
          height={720}
          src={service.image}
          alt="tt"
          className="w-full object-cover object-center min-w-[60vw] max-h-[280px] brightness-50 drag-none"
        />
      </div>

      {/* Card */}
      <div className="absolute inset-0 flex items-end justify-between p-6">
        {/* Wrapper */}
        <div className="text-white space-y-2 flex-1">
          <h1 className="text-lg font-semibold">{service.name}</h1>
          <p className="text-xs opacity-95 font-extralight line-clamp-3">
            {service.description}
          </p>
        </div>

        <div className="text-white absolute md:static top-5 right-5 space-y-2 flex-1 flex justify-end gap-3">
          {service.label.map((l) => (
            <div
              key={l}
              className="text-xs px-3 py-1 border border-border/25 rounded-full h-fit"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
