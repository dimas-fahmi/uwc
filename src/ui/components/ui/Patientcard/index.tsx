"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/src/lib/auth/client";
import { getInitial } from "@/src/lib/utils/getInitial";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";

const PatientCard = () => {
  const { data: auth } = authClient.useSession();
  const [patientName, setPatienName] = useState<string>("");

  useEffect(() => {
    if (auth?.user) {
      setPatienName(auth.user.name);
    }
  }, [auth]);

  return (
    <div
      className={`flex items-center gap-4 border rounded-lg p-4 shadow-md ${!patientName.trim() ? "border-destructive" : ""}`}
    >
      {patientName.trim() === auth?.user?.name && auth?.user?.image ? (
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={auth.user.image}
            alt={`${auth?.user?.name || "User"}'s avatar`}
          />
          <AvatarFallback>{getInitial(patientName)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          {getInitial(patientName)}
        </div>
      )}

      <div className="flex-1">
        <input
          className="text-lg w-full"
          value={patientName}
          onChange={(e) => {
            setPatienName(e.target.value);
          }}
          placeholder="Patient Name"
          autoFocus
        />
        <p
          className={`text-sm font-light ${!patientName.trim() ? "text-destructive" : ""}`}
        >
          {!patientName.trim() ? "Patient Name Is Required" : "Patient"}
        </p>
      </div>
    </div>
  );
};

export default PatientCard;
