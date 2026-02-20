"use client";

import { ChevronDown, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { useSidebar } from "@/src/ui/shadcn/components/ui/sidebar";

const PublicNavbar = () => {
  const { setOpen, setOpenMobile } = useSidebar();

  return (
    <nav className="p-4 md:px-12 flex items-center justify-between">
      {/* Logo & Navigation */}
      <div>
        {/* Logo */}
        <div>
          <Link href={"/"}>
            <Image
              width={120}
              height={60}
              src={"/res/logo/label-cropped.png"}
              alt="UWC Logo"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div></div>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <Button variant={"ghost"}>
            <Search />
            Search
          </Button>
          <Button variant={"ghost"}>
            ID <ChevronDown />
          </Button>
        </div>

        <Button
          variant={"ghost"}
          onClick={() => {
            setOpen(true);
            setOpenMobile(true);
          }}
        >
          Menu <Menu />
        </Button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
