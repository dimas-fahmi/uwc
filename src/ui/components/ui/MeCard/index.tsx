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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";

const MeCard = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const aMemberSince = user?.createdAt
    ? formatDistance(user?.createdAt, new Date(), {
        addSuffix: true,
      }).replace("about", "")
    : null;

  return (
    <div
      className={`p-4 border rounded-lg shadow-md flex items-center justify-between ${!isPending && !user ? "hidden" : ""}`}
      suppressHydrationWarning
    >
      <div className="flex items-center gap-2" suppressHydrationWarning>
        {isPending ? (
          <Skeleton className="w-12 h-12 rounded-full" />
        ) : (
          <Avatar className="w-12 h-12" suppressHydrationWarning>
            {user?.image && (
              <AvatarImage
                src={user.image}
                alt={`${user?.name || "User"}'s Avatar`}
                suppressHydrationWarning
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

          {isPending || !aMemberSince ? (
            <Skeleton className="h-2 w-16" />
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs font-light capitalize">
                  Since {aMemberSince}
                </p>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">{`${user?.name} has been a member since ${aMemberSince}`}</TooltipContent>
            </Tooltip>
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
