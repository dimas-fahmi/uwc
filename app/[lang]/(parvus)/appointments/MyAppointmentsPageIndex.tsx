"use client";

import { useQuery } from "@tanstack/react-query";
import { queryAppointments } from "@/src/lib/query/queries/queryAppointments";
import AppointmentCard from "@/src/ui/components/ui/AppointmentCard";

const MyAppointmentsPageIndex = () => {
  const { data, isPending } = useQuery({
    queryKey: ["appointment"],
    queryFn: () => queryAppointments(),
  });

  const appointments = data?.result;

  return (
    <div>
      {/* Cards */}
      <div className="space-y-4">
        {!isPending ? (
          appointments?.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div>Wait</div>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsPageIndex;
