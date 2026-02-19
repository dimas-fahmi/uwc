import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DB_URL is invalid or unavailable");
}

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
});
