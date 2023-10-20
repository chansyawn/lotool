import React from "react";

import cn from "@/utils/cn";

const BaseInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-md border border-neutral-border bg-transparent px-2 py-1 text-sm shadow-sm transition-colors",
          "hover:border-primary-border focus-visible:border-primary-border focus-visible:outline-none focus-visible:ring-2",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-text disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
BaseInput.displayName = "BaseInput";

export default BaseInput;
