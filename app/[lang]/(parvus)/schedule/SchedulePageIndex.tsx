"use client";

import Header from "../LayoutComponents/Header";
import ScheduleContainer from "./components/ScheduleContainer";
import SpecialtyPicker from "./components/SpecialtyPicker";
import SpecialtyState from "./components/SpecialtyState";

const SchedulePageIndex = () => {
  return (
    <div>
      <Header
        title="Doctor's Schedule"
        description="Book an appointment with ease with our digital application"
        className="mb-4"
      />

      <SpecialtyState />
      <SpecialtyPicker />
      <ScheduleContainer />
    </div>
  );
};

export default SchedulePageIndex;
