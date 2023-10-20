"use client";

import React, { ChangeEventHandler } from "react";
import { CSSProperties, useEffect, useRef } from "react";
import BaseInput from "./BaseInput";

export type InputNumberProps = {
  className?: string;
  style?: CSSProperties;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, style, value, onChange, min, max }: InputNumberProps) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const inputDom = ref.current;
      if (!inputDom) return;

      const preventWheel: EventListener = (e) => e.stopPropagation();
      inputDom.addEventListener("wheel", preventWheel);

      return () => inputDom.removeEventListener("wheel", preventWheel);
    }, []);

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const val = +e.target.value;
      if (max && val > max) {
        onChange(max);
        return;
      }
      if (min && val < min) {
        onChange(min);
        return;
      }
      onChange(+e.target.value);
    };

    return (
      <BaseInput
        ref={ref}
        className={className}
        style={style}
        type="number"
        value={"" + value}
        onChange={handleValueChange}
        min={min}
        max={max}
      />
    );
  },
);
InputNumber.displayName = "InputNumber";

export default InputNumber;
