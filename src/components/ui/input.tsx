import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full border-b border-charcoal/20 bg-transparent px-0 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-taupe/70 focus:border-charcoal",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-none border-b border-charcoal/20 bg-transparent px-0 py-3 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-taupe/70 focus:border-charcoal",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("eyebrow mb-3 block", className)}
      {...props}
    />
  );
}
