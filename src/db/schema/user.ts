import { boolean, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { authSchema } from "./configs";

export const userTable = authSchema.table(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    username: text("username").unique(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    phone_number: text(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    // UIDX
    uniqueIndex("uidx_auth_user_username").on(t.username),
  ],
);
