import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";
import { relations } from "./schema/relations";

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DB_URL is invalid or not exist");
}

const client = postgres(DB_URL, { prepare: false });
export const db = drizzle({ client, schema, relations });
