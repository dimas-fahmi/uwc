import { createAuthClient } from "better-auth/react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!APP_URL) {
  throw new Error("APP_URL is invalid or unavailable");
}

export const authClient = createAuthClient({
  baseURL: APP_URL,
});
