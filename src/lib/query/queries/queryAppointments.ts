import type {
  V1BookingGetRequest,
  V1BookingGetResponse,
} from "../../zod/booking";

export async function queryAppointments(
  req?: V1BookingGetRequest,
): Promise<V1BookingGetResponse> {
  const searchParams = new URLSearchParams(
    Object.entries(req || {}).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const response = await fetch(`/api/v1/booking?${searchParams.toString()}`);

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}
