"use client";

import Cookie from "js-cookie";
import type React from "react";
import { useEffect } from "react";
import OnlyForShowcaseDialog from "@/src/ui/components/ui/OnlyForShowecaseDialog";
import { useOFSDStore } from "@/src/ui/components/ui/OnlyForShowecaseDialog/OFSDStore";
import PublicFooter from "@/src/ui/components/ui/PublicFooter";
import PublicNavbar from "@/src/ui/components/ui/PublicNavbar";
import PublicSidebar from "@/src/ui/components/ui/PublicSidebar";
import { SidebarProvider } from "@/src/ui/shadcn/components/ui/sidebar";

const PublicLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const showedOnlyForShowcase = Cookie.get("showed_only_for_showcase");
  const { onOpenChange: setOFSDOpen } = useOFSDStore();

  useEffect(() => {
    if (!showedOnlyForShowcase) {
      setOFSDOpen(true);
    }
  }, [showedOnlyForShowcase]);

  return (
    <SidebarProvider defaultOpen={false}>
      <PublicSidebar />
      <main className="flex-1 overflow-hidden">
        {/* Navbar */}
        <PublicNavbar />

        {/* Content */}
        <div>{children}</div>

        {/* Footer */}
        <PublicFooter />

        {/* Modals */}
        <OnlyForShowcaseDialog />
      </main>
    </SidebarProvider>
  );
};

export default PublicLayout;
