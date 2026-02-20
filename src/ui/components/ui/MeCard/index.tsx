"use client";

import { formatDistance } from "date-fns";
import { EllipsisIcon } from "lucide-react";
import { authClient } from "@/src/lib/auth/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/ui/shadcn/components/ui/dropdown-menu";
import { Skeleton } from "@/src/ui/shadcn/components/ui/skeleton";

const MeCard = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  return (
    <div
      className={`p-4 border rounded-lg shadow-md flex items-center justify-between ${!isPending && !user ? "hidden" : ""}`}
    >
      <div className="flex items-center gap-2">
        {isPending ? (
          <Skeleton className="w-12 h-12 rounded-full" />
        ) : (
          <Avatar className="w-12 h-12">
            {user?.image && (
              <AvatarImage
                src={user.image}
                alt={`${user?.name || "User"}'s Avatar`}
              />
            )}
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
        )}

        <div className="space-y-0.5">
          {isPending ? (
            <Skeleton className="w-28 h-4" />
          ) : (
            <h1 className="font-semibold leading-4">
              {user?.name || "UNDEFINED"}
            </h1>
          )}

          {isPending ? (
            <Skeleton className="h-2 w-16" />
          ) : (
            <p className="text-xs font-light capitalize">
              {user?.createdAt
                ? formatDistance(user?.createdAt, new Date(), {
                    addSuffix: true,
                  })
                : "unknown"}
            </p>
          )}
        </div>
      </div>

      {isPending ? (
        <Skeleton className="w-5 h-1" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button disabled={isPending} type="button">
              <EllipsisIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Family</DropdownMenuItem>
              <DropdownMenuItem>Appointments</DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>More</DropdownMenuLabel>
              <DropdownMenuItem disabled>Change Language</DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => {
                  await authClient.signOut();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default MeCard;
