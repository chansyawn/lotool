"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "cva";
import cn from "@/utils/cn";

const buttonVariants = cva({
  base: "inline-flex items-center justify-center rounded transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-neutral-bg shadow hover:bg-neutral-bg-hover active:bg-neutral-bg-active",
      outline:
        "border border-neutral-border bg-transparent shadow-sm hover:border-neutral-border-hover active:bg-neutral-bg-active",
      ghost: "hover:bg-neutral-bg-hover",
      link: "underline-offset-4 hover:underline",
    },
    size: {
      default: "h-8 px-4 py-2",
      sm: "h-6 rounded px-1",
      icon: "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export default Button;
