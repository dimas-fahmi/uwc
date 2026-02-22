"use client";

import { formatDistance } from "date-fns";
import { authClient } from "@/src/lib/auth/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";
import { Skeleton } from "@/src/ui/shadcn/components/ui/skeleton";

const AvatarSection = () => {
  const { data: auth, isPending } = authClient.useSession();
  const user = auth?.user;
  const aMemberSince = user?.createdAt
    ? formatDistance(new Date(user.createdAt), new Date(), {
        addSuffix: true,
      }).replace("about", "")
    : null;

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {/* Avatar */}
      {isPending ? (
        <Skeleton className="w-28 h-28 rounded-full" />
      ) : (
        <Avatar className="w-28 h-28 border">
          {user?.image && (
            <AvatarImage
              src={user.image}
              alt={`${user?.name || "User"}'s avatar`}
            />
          )}
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col justify-center items-center gap-2">
        {isPending ? (
          <Skeleton className="w-48 h-5" />
        ) : (
          <h1 className="text-2xl font-semibold leading-4">{user?.name}</h1>
        )}
        {isPending ? (
          <Skeleton className="w-24 h-2" />
        ) : (
          <p className="text-sm font-light">Member since {aMemberSince}</p>
        )}
      </div>
    </div>
  );
};

export default AvatarSection;
