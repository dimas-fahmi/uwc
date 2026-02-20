"use client";

import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/src/lib/auth/client";
import {
  OAUTH_PROVIDER_METADATA,
  type OAuthProvider,
} from "@/src/lib/auth/configs";
import { isInternalUrl, isValidUrl } from "@/src/lib/utils/url";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { cn } from "@/src/ui/shadcn/lib/utils";

export interface SocialSignInButtonProps {
  social: OAuthProvider;
}

const SocialSignInButton = ({ social }: SocialSignInButtonProps) => {
  const metadata = OAUTH_PROVIDER_METADATA[social];
  const Icon = metadata.logo;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isClicked) return;

    const debouncer = setTimeout(() => {
      setIsClicked(false);
      alert("Something's went wrong, please try again.");
    }, 5000);

    return () => clearTimeout(debouncer);
  }, [isClicked]);

  const params = useSearchParams();
  const redTo = params.get("redTo");
  const isRedToValid = redTo
    ? isValidUrl(redTo) && isInternalUrl(redTo)
    : false;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center gap-2 border px-4 py-2 rounded-2xl disabled:opacity-60 not-disabled:hover:bg-primary not-disabled:hover:text-primary-foreground transition-all duration-200",
          )}
          disabled={!metadata.supported}
          onClick={async () => {
            if (!metadata.supported) return;

            setIsClicked(true);
            await authClient.signIn.social({
              provider: social,
              callbackURL: isRedToValid ? (redTo as string) : "/profile",
            });
          }}
        >
          {isClicked ? (
            <>
              <Loader className="animate-spin w-4 h-4" />
              <span className="text-sm">Wait a moment</span>
            </>
          ) : (
            <>
              <Icon className="w-4 h-4" />
              <span className="text-sm">Continue with {metadata.name}</span>
            </>
          )}
        </button>
      </TooltipTrigger>
      {!metadata.supported && <TooltipContent>Coming Soon</TooltipContent>}
    </Tooltip>
  );
};

export default SocialSignInButton;
