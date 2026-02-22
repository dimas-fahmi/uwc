import type { Metadata } from "next";
import AvatarSection from "./AvatarSection";
import NavSection from "./NavSection";

export const metadata: Metadata = {
  title: "Profile Page | UWC Bandung",
};

const ProfilePage = () => {
  return (
    <div className="space-y-4">
      <AvatarSection />
      <NavSection />
    </div>
  );
};

export default ProfilePage;
