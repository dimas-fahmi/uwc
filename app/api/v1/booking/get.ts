import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { prettifyError } from "zod";
import { db } from "@/src/db";
import type { BookingSelectType } from "@/src/db/schema/booking";
import { auth } from "@/src/lib/auth";
import { createResponse } from "@/src/lib/utils/createResponse";
import { getLimitAndOffset } from "@/src/lib/utils/pagination";
import {
  type V1BookingGetRequest,
  v1BookingGetRequest,
} from "@/src/lib/zod/booking";

const PATH = "V1_BOOKING_GET" as const;

export async function v1BookingGet(req: NextRequest) {
  // Validate Session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return createResponse(
      "invalid_session",
      "No session, please log in to access this data.",
      401,
    );
  }

  // Parse request
  const url = req.nextUrl;
  let params = Object.fromEntries(
    url.searchParams.entries(),
  ) as V1BookingGetRequest;

  const validation = v1BookingGetRequest.strict().safeParse(params);

  if (validation.error) {
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

  params = validation.data;

  const { limit, offset } = getLimitAndOffset(
    typeof params?.page === "number" ? params.page : 1,
    typeof params?.limit === "number" ? params.limit : undefined,
  );

  try {
    const response = await db.query.bookingTable.findMany({
      where: {
        id: typeof params?.id === "string" ? params.id : undefined,
        userId: user.id,
        patientName:
          typeof params?.patientName === "string"
            ? params.patientName
            : undefined,
        completedAt: {
          isNotNull: params?.isCompleted ? true : undefined,
          isNull:
            typeof params?.isCompleted === "boolean" && !params?.isCompleted
              ? true
              : undefined,
        },
      },
      orderBy: {
        preferredDate: "desc",
      },
      limit,
      offset,
    });

    return createResponse<BookingSelectType[]>(
      "record_fetched",
      "Bookings retrieved",
      200,
      response,
    );
  } catch (error) {
    return createResponse(
      "unknown_database_error",
      "Failed to retrieve bookings",
      500,
      error,
      "error",
      PATH,
    );
  }
}
