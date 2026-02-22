import {
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { bookingStatusEnum, departmentEnum } from "./configs";
import { userTable } from "./user";

export const bookingTable = pgTable(
  "booking",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => userTable.id, {
      onDelete: "cascade",
    }),
    patientName: text("patient_name").notNull(),
    patientBirthday: date("patient_birthday").notNull(),
    preferredDate: timestamp("preferred_date").notNull(),
    suggestedDate: timestamp("suggested_date"),
    confirmedDate: timestamp("confirmed_date"),
    department: departmentEnum("department").notNull(),
    doctorCode: text("doctor_code").notNull(),
    preferredFollowUp: text("preferred_follow_up"),
    status: bookingStatusEnum("booking_status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
    completedAt: timestamp("completed_at"),
  },
  (t) => [
    // IDX
    index("idx_public_booking_patientName").on(t.patientName),
    index("idx_public_booking_doctorCode").on(t.doctorCode),
    index("idx_public_booking_status").on(t.status),
    index("idx_public_booking_createdAt").on(t.createdAt),
    index("idx_public_booking_updatedAt").on(t.updatedAt),
    index("idx_public_booking_completedAt").on(t.completedAt),
  ],
);

export const bookingInsertSchema = createInsertSchema(bookingTable);
export const bookingSelectSchema = createSelectSchema(bookingTable);

export type BookingInsertType = typeof bookingTable.$inferInsert;
export type BookingSelectType = typeof bookingTable.$inferSelect;
