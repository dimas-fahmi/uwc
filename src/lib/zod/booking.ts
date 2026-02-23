import { z } from "zod";
import { DEFAULT_LIMIT } from "../utils/pagination";

export const newAppointmentSchema = z
  .object({
    patientName: z.string().min(1, { error: "Patient name is required" }),
    dayOfBirth: z.coerce
      .number<string>({ error: "Input the date number, like 1-31" })
      .min(1, { error: "Required" }),
    monthOfBirth: z.coerce
      .number<string>({ error: "Input the month number, like 2 for February." })
      .min(1, { error: "Required" })
      .max(12, { error: "Please insert a valid month" }),
    yearOfBirth: z.coerce
      .number<string>({
        error: "Input valid year, like 1990 ",
      })
      .min(1900, { error: "Required" }),
  })
  .refine(
    (v) => {
      const now = new Date();
      const year = now.getFullYear();

      if (v.yearOfBirth > year) {
        return false;
      }

      return true;
    },
    { error: "Please insert a valid year", path: ["yearOfBirth"] },
  )
  .refine(
    (v) => {
      if (!v.yearOfBirth || !v.monthOfBirth) {
        return false;
      }

      const days = new Date(v.yearOfBirth, v.monthOfBirth, 0).getDate();
      if (v.dayOfBirth > days) {
        return false;
      }

      return true;
    },
    { error: "Please insert a valid date", path: ["dayOfBirth"] },
  );

export const v1BookingGetRequest = z
  .object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    patientName: z.string().optional(),
    isCompleted: z.stringbool().optional(),
  })
  .refine((v) => {
    if (typeof v.limit === "number" && v.limit > DEFAULT_LIMIT) {
      return false;
    }

    return true;
  });

export type V1BookingGetRequest = z.infer<typeof v1BookingGetRequest>;
