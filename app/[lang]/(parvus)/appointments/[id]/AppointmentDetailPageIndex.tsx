"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDate, formatDistance } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SPECIALTY_METADATAS } from "@/src/lib/app";
import doctorsData from "@/src/lib/app/data/doctors.json";
import { queryAppointments } from "@/src/lib/query/queries/queryAppointments";
import WhatsApp from "@/src/ui/components/logo/WhatsApp";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/src/ui/shadcn/components/ui/table";

const AppointmentDetailPageIndex = ({ id }: { id: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["myAppointment", id],
    queryFn: () => queryAppointments({ id }),
  });

  const appointment = data?.result?.[0];

  const doctor = doctorsData.doctors.find(
    (doctor) => doctor.code === appointment?.doctorCode,
  );

  const department = appointment
    ? SPECIALTY_METADATAS[appointment?.department]
    : null;

  return isPending ? (
    <div>wait</div>
  ) : (
    <div className="space-y-4">
      <div>
        <Table>
          <TableBody>
            {/* Patient Name */}
            <TableRow>
              <TableCell className="min-w-48 max-w-48">Patient</TableCell>
              <TableCell>{appointment?.patientName}</TableCell>
            </TableRow>

            {/* Patient Name */}
            <TableRow>
              <TableCell className="min-w-48 max-w-48">
                Patient Date of Birth
              </TableCell>
              <TableCell>
                {appointment?.patientBirthday
                  ? formatDate(appointment.patientBirthday, "dd MMMM yyyy")
                  : ""}
              </TableCell>
            </TableRow>

            {/* Patient Age */}
            <TableRow>
              <TableCell className="min-w-48 max-w-48">Patient Age</TableCell>
              <TableCell>
                {appointment?.patientBirthday
                  ? formatDistance(
                      appointment.patientBirthday,
                      new Date(),
                    ).replace("about", "")
                  : ""}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="min-w-48 max-w-48">Doctor</TableCell>
              <TableCell>{doctor?.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="min-w-48 max-w-48">Department</TableCell>
              <TableCell>{department?.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="min-w-48 max-w-48">
                Preferred Date
              </TableCell>
              <TableCell>
                {appointment?.preferredDate
                  ? formatDate(appointment.preferredDate, "dd MMMM yyyy")
                  : ""}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="min-w-48 max-w-48">
                Confirmed Date
              </TableCell>
              <TableCell>
                {appointment?.confirmedDate
                  ? formatDate(appointment.preferredDate, "dd MMMM yyyy")
                  : "Waiting Confirmation"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="min-w-48 max-w-48">Status</TableCell>
              <TableCell className="capitalize">
                {appointment?.completedAt
                  ? `Completed ${formatDistance(appointment.completedAt, new Date(), { addSuffix: true })}`
                  : appointment?.status}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={"outline"} size={"xs"} asChild>
          <Link href={`/appointments`}>
            <ArrowLeft /> My Appointments
          </Link>
        </Button>
        <Button variant={"outline"} size={"xs"} asChild>
          <Link href={`#`}>
            <WhatsApp /> Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetailPageIndex;
