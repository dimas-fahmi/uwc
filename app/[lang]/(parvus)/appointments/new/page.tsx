import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { SPECIALTIES, type Specialty } from "@/src/lib/app";
import NewAppointmentPageIndex from "./NewAppointmentPageIndex";

export const metadata: Metadata = {
  title: "New Appointment | UWC Bandung",
};

const NewAppointmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; department?: string; date?: string }>;
}) => {
  const { id, date, department } = await searchParams;
  const timestamp = Number(date);

  if (
    typeof id !== "string" ||
    typeof department !== "string" ||
    !SPECIALTIES.includes(department as Specialty) ||
    Number.isNaN(timestamp)
  ) {
    redirect("/schedule", RedirectType.replace);
  }

  return (
    <NewAppointmentPageIndex
      id={id}
      date={timestamp}
      department={department as Specialty}
    />
  );
};

export default NewAppointmentPage;
