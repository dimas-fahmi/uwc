import type React from "react";

const PublicLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div>
      {/* Navbar */}
      <nav>Navbar</nav>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer></footer>
    </div>
  );
};

export default PublicLayout;
