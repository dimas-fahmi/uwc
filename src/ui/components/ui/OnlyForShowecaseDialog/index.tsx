"use client";

import Cookie from "js-cookie";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/ui/shadcn/components/ui/dialog";
import { useOFSDStore } from "./OFSDStore";

const OnlyForShowcaseDialog = () => {
  const { open, onOpenChange } = useOFSDStore();

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please Note</DialogTitle>
          <DialogDescription>
            This website is a demonstration project created to showcase my web
            development and software engineering skills. It is not a live or
            commercial platform.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => {
              Cookie.set("showed_only_for_showcase", "1", { expires: 3 });
              onOpenChange(false);
            }}
          >
            Understood
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnlyForShowcaseDialog;
