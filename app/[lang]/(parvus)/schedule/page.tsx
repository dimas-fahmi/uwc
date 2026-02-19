import type { Metadata } from "next";
import SchedulePageIndex from "./SchedulePageIndex";

export const metadata: Metadata = {
  title: "Doctor's Schedule | UWC",
};

const SchedulePage = () => {
  return <SchedulePageIndex />;
};

export default SchedulePage;
