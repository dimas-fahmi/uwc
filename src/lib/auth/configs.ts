import Apple from "@/src/ui/components/logo/Apple";
import Discord from "@/src/ui/components/logo/Discord";
import Facebook from "@/src/ui/components/logo/Facebook";
import Github from "@/src/ui/components/logo/Github";
import Google from "@/src/ui/components/logo/Google";

export const OAUTH_PROVIDERS = [
  "apple",
  "discord",
  "facebook",
  "github",
  "google",
] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];
export interface OAuthProviderMetadata {
  name: string;
  logo: React.ComponentType<React.ComponentProps<"svg">>;
  supported: boolean;
}

export const OAUTH_PROVIDER_METADATA = {
  apple: {
    name: "Apple",
    logo: Apple,
    supported: false,
  },
  discord: {
    name: "Discord",
    logo: Discord,
    supported: false,
  },
  facebook: {
    name: "Facebook",
    logo: Facebook,
    supported: false,
  },
  github: {
    name: "GitHub",
    logo: Github,
    supported: false,
  },
  google: {
    name: "Google",
    logo: Google,
    supported: true,
  },
} satisfies Record<OAuthProvider, OAuthProviderMetadata>;
