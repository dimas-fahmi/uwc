import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "../../LayoutComponents/Header";
import AppointmentDetailPageIndex from "./AppointmentDetailPageIndex";

export const metadata: Metadata = {
  title: "My Appointment | UWC Bandung",
};

const AppointmentPage = async ({
  params,
}: {
  params: Promise<{ id?: string }>;
}) => {
  const { id } = await params;

  if (typeof id !== "string") {
    redirect("/appointments");
  }

  return (
    <div className="space-y-4">
      <Header
        title="Appointment Detail"
        description="Review your appointment detail and status"
      />
      <AppointmentDetailPageIndex id={id} />
    </div>
  );
};

export default AppointmentPage;
