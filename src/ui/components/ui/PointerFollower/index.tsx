"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const PointerFollower = ({
  children,
  text,
}: {
  children: Readonly<React.ReactNode>;
  text?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-150);
  const mouseY = useMotionValue(-150);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const ballSize = 80;

  const x = useTransform(springX, (v) => v - ballSize / 2);
  const y = useTransform(springY, (v) => v - ballSize / 2);

  // Distance between pointer & spring
  const distance = useTransform(
    [mouseX, mouseY, springX, springY],
    ([mx, my, sx, sy]: number[]) => {
      const dx = mx - sx;
      const dy = my - sy;
      return Math.sqrt(dx * dx + dy * dy);
    },
  );

  // Target scale based on distance
  const scaleTarget = useTransform(distance, [0, 40], [0.8, 1]);

  // Add spring to scale for smooth size animation
  const scale = useSpring(scaleTarget, {
    stiffness: 80,
    damping: 11,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      <motion.div
        drag
        dragConstraints={containerRef}
        whileDrag={{ scale: 1.2 }}
        className="pointer-events-none absolute z-40 flex items-center justify-center rounded-full bg-foreground text-background text-sm font-extralight"
        style={{
          width: ballSize,
          height: ballSize,
          x,
          y,
          scale,
        }}
      >
        {text || "Drag"}
      </motion.div>

      <div>{children}</div>
    </div>
  );
};

export default PointerFollower;
