"use client";

import React from "react";
import clsx from "clsx";

type InputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export default (function Input({ className, value, onChange }: InputProps) {
  return (
    <input
      className={clsx(
        "rounded border px-2 py-1 shadow-none outline-none transition-[box-shadow] hover:border-primary focus:border-primary-400 focus:ring",
        className,
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});
