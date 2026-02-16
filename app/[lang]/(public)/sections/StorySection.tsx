"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StorySection = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      className="text-start min-w-vw max-w-vw min-h-dvh max-h-dvh relative cursor-pointer overflow-hidden"
      onClick={() => {
        if (isClicked) {
          router.push("/stories");
        } else {
          setIsClicked(true);
        }
      }}
    >
      <Image
        width={1920}
        height={1280}
        src={"/res/arts/uwc-02.jpg"}
        alt="Story Cover"
        className={`min-w-vw max-w-vw min-h-dvh max-h-dvh object-cover brightness-50 ${isClicked ? "blur-sm scale-125" : "scale-105"} transition-all duration-500`}
      />

      <div className="absolute inset-0 layout-padding text-white max-w-lg space-y-6">
        <h1 className="text-4xl font-bold">
          UWC's Heroes: Stories of Health and Healing
        </h1>

        <p className="font-extralight">
          Discover inspiring journeys of wellness and recovery from our valued
          patients at UWC
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={isClicked ? { width: "auto" } : { width: 0 }}
          className="overflow-hidden"
        >
          <div className="px-4 py-2 rounded-lg border text-xs text-nowrap">
            Click One More Time To Read Our Stories
          </div>
        </motion.div>
      </div>
    </button>
  );
};

export default StorySection;
