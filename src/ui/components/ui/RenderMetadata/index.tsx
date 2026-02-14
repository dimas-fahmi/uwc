"use client";

import { cn } from "@/src/ui/shadcn/lib/utils";

export type Metadata = {
  title: string;
  value: React.ReactNode;
};

export interface RenderMetadataProps {
  metadatas: Metadata[];
  borderIndex?: number[];
  cardProps?: {
    root?: React.ComponentProps<"div">;
    title?: React.ComponentProps<"h6">;
    content?: React.ComponentProps<"div">;
  };
}

const RenderMetadata = ({
  metadatas = [],
  borderIndex = [],
  className,
  ...props
}: RenderMetadataProps & React.ComponentProps<"div">) => {
  return (
    <div {...props} className={cn("flex gap-4", className)}>
      {metadatas.map((m, index) => (
        <div
          key={index}
          className={`space-y-1 ${borderIndex.includes(index) ? "border-l ps-4" : ""} pe-4`}
          suppressHydrationWarning
        >
          <h6 className="text-xs font-light opacity-80">{m.title}</h6>
          <div className="font-light line-clamp-1">{m.value}</div>
        </div>
      ))}
    </div>
  );
};

export default RenderMetadata;
