import { createAuthClient } from "better-auth/react";
import { APP_URL } from "../utils/url";

export const authClient = createAuthClient({
  baseURL: APP_URL,
});
