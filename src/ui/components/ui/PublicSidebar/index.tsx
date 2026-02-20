import { ChevronLeft } from "lucide-react";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Sidebar,
  SidebarHeader,
  useSidebar,
} from "@/src/ui/shadcn/components/ui/sidebar";
import MeCard from "../MeCard";

const PublicSidebar = () => {
  const { setOpen, setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Title and Controller */}
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg font-bold">Menu</h1>
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
    </Sidebar>
  );
};

export default PublicSidebar;
