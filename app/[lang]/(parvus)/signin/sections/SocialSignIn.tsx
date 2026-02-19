"use client";

import { OAUTH_PROVIDERS } from "@/src/lib/auth/configs";
import SocialSignInButton from "@/src/ui/components/ui/SocialSignInButton";

const SocialSignIn = () => {
  return (
    <div className="grid grid-cols-1 max-w-md mx-auto gap-3">
      {OAUTH_PROVIDERS.map((p) => (
        <SocialSignInButton key={p} social={p} />
      ))}
    </div>
  );
};

export default SocialSignIn;
