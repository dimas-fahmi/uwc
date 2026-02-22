"use client";

import { Calendar, Key, UserRound, UsersRound } from "lucide-react";
import Navigation from "@/src/ui/components/ui/PublicSidebar/Navigation";

const NavSection = () => {
  return (
    <section id="navigation">
      <Navigation
        items={[
          { icon: Calendar, text: "My Appointments" },
          { icon: UserRound, text: "My Data" },
          { icon: UsersRound, text: "My Family" },
          { icon: Key, text: "Security" },
        ]}
      />
    </section>
  );
};

export default NavSection;
