"use client";

import { formatDate } from "date-fns";
import { ArrowRight } from "lucide-react";
import type { BookingSelectType } from "@/src/db/schema/booking";
import { SPECIALTY_METADATAS } from "@/src/lib/app";
import doctorsData from "@/src/lib/app/data/doctors.json";
import { getInitial } from "@/src/lib/utils/getInitial";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/src/ui/shadcn/components/ui/avatar";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/src/ui/shadcn/components/ui/table";

const AppointmentCard = ({
  appointment,
}: {
  appointment: BookingSelectType;
}) => {
  const doctor = doctorsData.doctors.find(
    (doctor) => doctor.code === appointment.doctorCode,
  );
  const department = SPECIALTY_METADATAS[appointment.department];

  return (
    doctor && (
      <div className="border p-4 rounded-lg space-y-2">
        {/* Header Section     */}
        <header className="flex items-center gap-2">
          {/* Avatars */}
          <div>
            <AvatarGroup>
              {/* Patient's Avatar */}
              <Avatar className="w-8 h-8 border grayscale">
                <AvatarFallback>
                  {getInitial(appointment.patientName)}
                </AvatarFallback>
              </Avatar>

              {/* Doctor's Avatar */}
              <Avatar className="w-8 h-8 border grayscale">
                <AvatarFallback>{getInitial(doctor.name)}</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>

          {/* Information Title */}
          <div className="flex items-center gap-4 justify-between w-full">
            <h1 className="font-semibold">{department.name}</h1>

            <Button variant={"outline"} size={"xs"}>
              <ArrowRight />
            </Button>
          </div>
        </header>

        {/* Detailed Information */}
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>{doctor.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Prefered Date</TableCell>
                <TableCell>
                  {formatDate(
                    new Date(appointment.preferredDate),
                    "dd MMMM yyyy",
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell className="capitalize">
                  {appointment.status}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  );
};

export default AppointmentCard;
