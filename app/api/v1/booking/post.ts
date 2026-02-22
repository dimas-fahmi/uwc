import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { prettifyError, z } from "zod";
import { db } from "@/src/db";
import {
  type BookingInsertType,
  bookingInsertSchema,
  bookingTable,
} from "@/src/db/schema/booking";
import { auth } from "@/src/lib/auth";
import { createResponse } from "@/src/lib/utils/createResponse";

export type V1BookingPostRequest = Pick<
  z.infer<typeof bookingInsertSchema>,
  | "patientBirthday"
  | "patientName"
  | "preferredDate"
  | "doctorCode"
  | "department"
>;

const PATH = "V1_BOOKING_POST" as const;

export async function v1BookingPost(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return createResponse("invalid_session", "No session, please log in.", 401);
  }

  // Parse Request
  let body: V1BookingPostRequest;

  try {
    body = await req.json();
  } catch (error) {
    return createResponse(
      "bad_request",
      "Invalid request form, expected raw JSON.",
      400,
      undefined,
      "error",
      PATH,
      error,
    );
  }

  const validation = bookingInsertSchema
    .pick({
      patientName: true,
      doctorCode: true,
      department: true,
      patientBirthday: true,
    })
    .extend({
      preferredDate: z.coerce.date(),
    })
    .safeParse(body);

  if (!validation.success) {
    return createResponse(
      "bad_request",
      prettifyError(validation.error),
      400,
      validation.error,
      "warn",
      PATH,
      validation.error,
    );
  }

  const request: BookingInsertType = {
    ...validation.data,
    userId: user.id,
  };

  try {
    const response = await db.insert(bookingTable).values(request).returning();

    return createResponse(
      "record_stored",
      "Booking record is created and waiting for approval",
      200,
      [response],
    );
  } catch (error) {
    return createResponse(
      "unknown_database_error",
      "Unknown error when creating your booking",
      500,
      undefined,
      "error",
      PATH,
      error,
    );
  }
}
