"use client";

import React, { createContext, useContext } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { VariantProps, cva } from "cva";
import cn from "@/utils/cn";

const RadioGroupContext = createContext<VariantProps<typeof radioVariants>>({});

const radioVariants = cva({
  base: "flex items-center disabled:cursor-not-allowed disabled:opacity-50 outline-none w-fit",
  variants: {
    variant: {
      default: "",
      button:
        "data-[state=checked]:bg-primary-bg rounded border-neutral-border border hover:bg-primary-bg-hover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
    VariantProps<typeof radioVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ variant }}>
      <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { label?: string }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, children, label, value, ...props }, ref) => {
  const { variant } = useContext(RadioGroupContext);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      className={radioVariants({ variant, className })}
      {...props}
    >
      {variant !== "button" && (
        <div className="flex h-4 w-4 items-center justify-center rounded-full border shadow outline-none">
          <RadioGroupPrimitive.Indicator className="h-2 w-2 rounded-full bg-primary-solid" />
        </div>
      )}
      {label && (
        <Label htmlFor={value} className="mx-1 cursor-pointer">
          {label}
        </Label>
      )}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
