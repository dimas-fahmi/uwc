import type { Metadata } from "next";
import Header from "../LayoutComponents/Header";
import MyAppointmentsPageIndex from "./MyAppointmentsPageIndex";

export const metadata: Metadata = {
  title: "My Appointments | UWC Bandung",
};

const AppointmentsPage = () => {
  return (
    <div className="space-y-4">
      <Header
        title="My Appointments"
        description="All of your appointments history"
      />

      <MyAppointmentsPageIndex />
    </div>
  );
};

export default AppointmentsPage;
