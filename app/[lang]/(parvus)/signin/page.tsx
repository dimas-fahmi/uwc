import type { Metadata } from "next";
import Header from "../LayoutComponents/Header";
import SocialSignIn from "./sections/SocialSignIn";

export const metadata: Metadata = {
  title: "Authentication Page | UWC Bandung",
};

const SignInPage = () => {
  return (
    <div className="space-y-4">
      <Header
        title="Continue to UWC Bandung"
        description="Book appointment and track you booking confirmation with ease"
      />

      <SocialSignIn />

      <p className="text-xs font-light opacity-70">
        By continuing, you agree to our Terms of Service and Privacy Policy and
        consent to the collection and use of your information as described.
      </p>
    </div>
  );
};

export default SignInPage;
