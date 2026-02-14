import type React from "react";
import PublicFooter from "@/src/ui/components/ui/PublicFooter";
import PublicNavbar from "@/src/ui/components/ui/PublicNavbar";

const PublicLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div>
      {/* Navbar */}
      <PublicNavbar />

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
