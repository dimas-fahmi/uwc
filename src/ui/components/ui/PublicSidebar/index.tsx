"use client";

import {
  BadgeInfo,
  Book,
  Calendar,
  CalendarDays,
  ChevronLeft,
  HomeIcon,
  LogIn,
  Phone,
  Scale,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth/client";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/src/ui/shadcn/components/ui/sidebar";
import MeCard from "../MeCard";
import Navigation from "./Navigation";

const PublicSidebar = () => {
  const { data: auth } = authClient.useSession();
  const user = auth?.user;
  const { setOpen, setOpenMobile } = useSidebar();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="border-b pb-4">
        {/* Title and Controller */}
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg font-bold mt-1">Menu</h1>
          <Button
            className="rounded-full w-8 h-8 flex items-center justify-center"
            variant={"outline"}
            onClick={() => {
              setOpen(false);
              setOpenMobile(false);
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* User Card */}
        <MeCard />
      </SidebarHeader>

      <div className="p-2">
        <Navigation
          items={[
            {
              icon: HomeIcon,
              text: "Homepage",
            },
            {
              icon: LogIn,
              text: "Sign In",
              className: `${user ? "hidden" : ""}`,
              onClick: () => {
                router.push("/signin");
              },
            },
            {
              icon: UserRound,
              text: "Profile",
              className: `${user ? "" : "hidden"}`,
            },

            {
              icon: UsersRound,
              text: "My Family",
              className: `${user ? "" : "hidden"}`,
            },
            {
              icon: Calendar,
              text: "Appointments",
              className: `${user ? "" : "hidden"}`,
            },

            {
              icon: CalendarDays,
              text: "Schedule",
            },
            {
              icon: Book,
              text: "Stories",
              disabled: true,
            },

            {
              icon: ShieldCheck,
              text: "Privacy Policy",
            },
            {
              icon: Scale,
              text: "Agreements",
            },

            {
              icon: BadgeInfo,
              text: "About Us",
            },
            {
              icon: Phone,
              text: "Contact Us",
            },
          ]}
        />
      </div>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default PublicSidebar;
