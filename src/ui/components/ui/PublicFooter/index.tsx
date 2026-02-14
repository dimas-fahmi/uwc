"use client";

import Image from "next/image";
import Link from "next/link";

const PublicFooter = () => {
  return (
    <footer className="layout-padding pb-4">
      {/* Logo & Navigation */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-12">
        <Image
          width={120}
          height={48}
          src={"/res/logo/label-cropped.png"}
          alt="UWC Logo"
        />

        {/* Navigation */}
        <nav className="grid grid-cols-4 md:flex items-center gap-4 text-sm">
          <Link href={"#services"} scroll className="hover:underline">
            Services
          </Link>
          <Link href={"#doctors"} scroll className="hover:underline">
            Doctors
          </Link>
          <Link href={"#contactUs"} scroll className="hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default PublicFooter;
