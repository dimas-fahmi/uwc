import type {
  V1BookingPostRequest,
  V1BookingPostResponse,
} from "@/app/api/v1/booking/post";

export async function createNewAppointment(req: V1BookingPostRequest) {
  const response = await fetch("/api/v1/booking", {
    method: "POST",
    body: JSON.stringify(req),
  });

  const result = (await response.json()) as V1BookingPostResponse;

  if (result?.status !== 200) {
    throw result;
  }

  return result;
}
