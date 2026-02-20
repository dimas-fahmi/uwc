import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/src/db";
import { schema } from "@/src/db/schema";
import { APP_URL } from "../utils/url";

const GITHUB_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const DISCORD_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_SECRET = process.env.DISCORD_CLIENT_SECRET;

if (!GITHUB_ID || !GITHUB_SECRET) {
  throw new Error(
    "Either GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is required but undefined",
  );
}

if (!GOOGLE_ID || !GOOGLE_SECRET) {
  throw new Error(
    "Either GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is required but undefined",
  );
}

if (!DISCORD_ID || !DISCORD_SECRET) {
  throw new Error(
    "Either DISCORD_CLIENT_ID or DISCORD_CLIENT_SECRET is required but undefined",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account: schema.accountTable,
      user: schema.userTable,
      session: schema.sessionTable,
      verification: schema.verificationTable,
    },
  }),
  baseURL: APP_URL,
  socialProviders: {
    github: {
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    },
    google: {
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    },
    discord: {
      clientId: DISCORD_ID,
      clientSecret: DISCORD_SECRET,
    },
  },
});
