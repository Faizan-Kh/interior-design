import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-label inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-[#1c1916] text-[#f6f1e9] hover:bg-[#2c2620] hover:-translate-y-px",
        light:
          "bg-[#f6f1e9] text-[#1c1916] hover:bg-[#efe8dc] hover:-translate-y-px",
        outline:
          "border border-[#1c1916]/20 bg-transparent text-[#1c1916] hover:border-[#1c1916] hover:bg-[#1c1916] hover:text-[#f6f1e9]",
        ghost: "bg-transparent text-[#1c1916] hover:text-[#6b5340]",
        invert:
          "border border-[#f6f1e9]/60 bg-transparent text-[#f6f1e9] hover:bg-[#f6f1e9] hover:text-[#1c1916]",
      },
      size: {
        default: "h-12 px-7",
        lg: "h-14 px-8",
        sm: "h-10 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
