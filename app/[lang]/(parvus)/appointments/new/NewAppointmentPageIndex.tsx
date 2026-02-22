"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate, formatDistance } from "date-fns";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type { V1BookingPostRequest } from "@/app/api/v1/booking/post";
import { SPECIALTY_METADATAS, type Specialty } from "@/src/lib/app";
import priceData from "@/src/lib/app/data/consultationPrice.json";
import doctorsData from "@/src/lib/app/data/doctors.json";
import publicHolidays from "@/src/lib/app/data/publicHolidays.json";
import { newAppointmentSchema } from "@/src/lib/zod/booking";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/src/ui/shadcn/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";

const NewAppointmentPageIndex = ({
  id,
  date,
  department,
}: {
  id: string;
  department: Specialty;
  date: number;
}) => {
  const doctor = doctorsData.doctors.find((d) => d.code === id);
  const router = useRouter();
  const dateParsed = new Date(date);
  const price = priceData.consultationPrice[department];
  const basePrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price.basePrice);
  const isPublicHoliday = publicHolidays.find(
    (ph) => ph.date === formatDate(dateParsed, "yyyy-MM-dd"),
  );
  const isWeekend = ["sunday", "saturday"].includes(
    formatDate(dateParsed, "EEEE").toLowerCase(),
  );
  const isDayOff = isPublicHoliday || isWeekend;
  const finalPrice = isDayOff
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(price.basePrice * price.dayOffMultiplier)
    : basePrice;

  if (!doctor) {
    router.replace("/schedule");
  }

  const form = useForm({
    resolver: zodResolver(newAppointmentSchema),
    mode: "onChange",
    defaultValues: {
      patientName: "",
      dayOfBirth: "",
      monthOfBirth: "",
      yearOfBirth: "",
    },
  });

  const month = form.watch("monthOfBirth");
  const year = form.watch("yearOfBirth");

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        const request: V1BookingPostRequest = {
          patientBirthday: new Date(
            data.yearOfBirth,
            data.monthOfBirth - 1,
            data.dayOfBirth,
          ).toDateString(),
          patientName: data.patientName,
          doctorCode: id,
          department: department,
          preferredDate: dateParsed,
        };

        console.log(request);
      })}
      className="space-y-4"
    >
      <header>
        <h1 className="text-4xl font-bold">Appointment Form</h1>
        <p>
          We appreciate your trust in us as your healthcare provider. Kindly
          complete this form to finalize your appointment booking.
        </p>
      </header>

      {/* Doctor Information */}
      <div>
        <h1>Doctor</h1>
        <span className="py-2 px-4 bg-muted block text-xl font-semibold border text-muted-foreground">
          {doctor?.name}
        </span>
      </div>

      {/* Specialty Information */}
      <div>
        <h1>Specialty</h1>
        <span className="py-2 px-4 bg-muted block text-xl font-semibold border text-muted-foreground">
          {doctor?.specialty}
        </span>
      </div>

      {/* Date Information */}
      <div>
        <h1>Booking Date</h1>
        <span className="py-2 px-4 bg-muted flex items-center justify-between text-xl font-semibold border text-muted-foreground">
          {formatDate(dateParsed, "dd MMMM yyyy")}

          <span className="text-xs font-normal">
            {formatDistance(dateParsed, new Date(), { addSuffix: true })}
          </span>
        </span>
      </div>

      {/* Patient Name Information */}
      <Controller
        control={form.control}
        name="patientName"
        render={({ field, fieldState }) => (
          <div>
            <h1>Patient Name</h1>
            <input
              type="text"
              className={`py-2 px-4 bg-muted block text-xl font-semibold w-full border ${fieldState.error ? "border-destructive" : ""}`}
              placeholder="e.g Jajang Nurdjaman"
              {...field}
            />

            <p
              className={`text-xs text-destructive ${!fieldState.error?.message ? "opacity-0" : ""}`}
            >
              {fieldState?.error?.message}
            </p>
          </div>
        )}
      />

      {/* Patient DOB Information */}
      <div>
        <h1>Patient Date of Birth</h1>
        <div className="grid grid-cols-3 gap-3">
          <Controller
            control={form.control}
            name="yearOfBirth"
            render={({ field, fieldState }) => (
              <div>
                <input
                  type="text"
                  className={`py-2 px-4 bg-muted block text-xl font-semibold w-full border ${fieldState?.error?.message ? "border-destructive" : ""}`}
                  placeholder="Year"
                  {...field}
                />
                <p
                  className={`${!fieldState?.error?.message ? "opacity-0" : ""} transition-all duration-300 text-xs text-destructive`}
                >
                  {fieldState?.error?.message}
                </p>
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="monthOfBirth"
            render={({ field, fieldState }) => (
              <div>
                <input
                  type="text"
                  className={`py-2 px-4 bg-muted block text-xl font-semibold w-full border ${fieldState?.error?.message ? "border-destructive" : ""}`}
                  placeholder="Month"
                  {...field}
                />
                <p
                  className={`${!fieldState?.error?.message ? "opacity-0" : ""} transition-all duration-300 text-xs text-destructive`}
                >
                  {fieldState?.error?.message}
                </p>
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="dayOfBirth"
            render={({ field, fieldState }) => (
              <div>
                <input
                  type="text"
                  className={`py-2 px-4 bg-muted block text-xl font-semibold w-full border disabled:opacity-50 ${fieldState?.error?.message ? "border-destructive" : ""}`}
                  placeholder="Date"
                  disabled={!month && !year}
                  {...field}
                />
                <p
                  className={`${!fieldState?.error?.message ? "opacity-0" : ""} transition-all duration-300 text-xs text-destructive`}
                >
                  {fieldState?.error?.message}
                </p>
              </div>
            )}
          />
        </div>
      </div>

      {/* Price Estimation  */}
      <div className="space-y-1">
        <h1>Estimation Consultation Fee</h1>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Base Fee</TableCell>
              <TableCell className="text-right">{basePrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-1">
                Day off multiplier
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md">
                    <p>
                      This additional fee is applied in Public Holidays and
                      Weekend. Day off fee for{" "}
                      {SPECIALTY_METADATAS[department].name} is{" "}
                      {price.dayOffMultiplier} of the base price.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(
                  isDayOff
                    ? price.basePrice * price.dayOffMultiplier - price.basePrice
                    : 0,
                )}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="flex items-center gap-1">
                Total
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      We required fifty percent of this amount to be deposited.
                      If you cancel 24 hours prior to your appointment, the
                      entire deposited amount will be refunded.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="text-right">{finalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <p className="text-xs font-light opacity-70 flex gap-1 mt-3">
          <Info className="w-4 h-4" />
          The price above is a consultation fee and does not include treatment
          or service costs such as lab diagnosis or x-rays.
        </p>
      </div>

      <Button type="submit" className="block w-full">
        Book Appointment
      </Button>
    </form>
  );
};

export default NewAppointmentPageIndex;
