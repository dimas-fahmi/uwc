import { pgEnum, pgSchema } from "drizzle-orm/pg-core";
import { SPECIALTIES } from "../../lib/app";

export const authSchema = pgSchema("auth");

export const departmentEnum = pgEnum("department_enum", SPECIALTIES);

export const BOOKING_STATUSES = [
  "pending",
  "revised_and_aborted",
  "revised_and_confirmed",
  "confirmed",
] as const;

export const bookingStatusEnum = pgEnum(
  "booking_status_enum",
  BOOKING_STATUSES,
);
