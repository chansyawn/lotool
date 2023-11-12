import React, { ChangeEventHandler } from "react";
import cn from "@/utils/cn";

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  onChange: (value: string) => void;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleValueChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      onChange(e.target.value);
    };

    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border bg-transparent px-2 py-1 text-sm shadow-sm placeholder:text-neutral-text",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        onChange={handleValueChange}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
