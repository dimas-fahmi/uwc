"use client";

import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useSidebar } from "@/src/ui/shadcn/components/ui/sidebar";
import { cn } from "@/src/ui/shadcn/lib/utils";

export type NavigationItem = {
  text: string;
  icon: LucideIcon;
  preventDefault?: boolean;
} & Omit<React.ComponentProps<"button">, "children">;

export type NavigationProps = {
  items?: NavigationItem[];
};

const Navigation = ({ items = [] }: NavigationProps) => {
  const { setOpen, setOpenMobile } = useSidebar();
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(
        (
          { icon: Icon, className, text, onClick, preventDefault, ...props },
          index,
        ) => (
          <button
            type="button"
            key={index}
            {...props}
            className={cn(
              "border p-3 rounded-lg flex flex-col justify-center items-center not-disabled:hover:bg-primary not-disabled:hover:text-primary-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-default",
              className,
            )}
            onClick={(e) => {
              onClick?.(e);

              if (!preventDefault) {
                setOpen(false);
                setOpenMobile(false);
              }
            }}
          >
            <Icon className={cn("w-5 h-5")} />{" "}
            <span className={cn("text-sm font-light")}>{text}</span>
          </button>
        ),
      )}
    </div>
  );
};

export default Navigation;
