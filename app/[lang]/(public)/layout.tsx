import type React from "react";
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
      <footer></footer>
    </div>
  );
};

export default PublicLayout;
