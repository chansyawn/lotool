"use client";

import React from "react";
import BaseInput from "./BaseInput";

type InputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange }: InputProps, ref) => {
    return (
      <BaseInput
        ref={ref}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  },
);
Input.displayName = "Input";

export default Input;
