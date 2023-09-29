"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange">;

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, value, onChange, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "rounded border px-2 py-1 shadow-none outline-none transition-[box-shadow] hover:border-primary focus:border-primary-400 focus:ring",
        className,
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
});
