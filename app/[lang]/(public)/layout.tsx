"use client";

import Cookie from "js-cookie";
import type React from "react";
import { useEffect } from "react";
import OnlyForShowcaseDialog from "@/src/ui/components/ui/OnlyForShowecaseDialog";
import { useOFSDStore } from "@/src/ui/components/ui/OnlyForShowecaseDialog/OFSDStore";
import PublicFooter from "@/src/ui/components/ui/PublicFooter";
import PublicNavbar from "@/src/ui/components/ui/PublicNavbar";

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
    <div>
      {/* Navbar */}
      <PublicNavbar />

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <PublicFooter />

      {/* Modals */}
      <OnlyForShowcaseDialog />
    </div>
  );
};

export default PublicLayout;
