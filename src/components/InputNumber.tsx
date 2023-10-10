"use client";

import { CSSProperties, ChangeEventHandler, useEffect, useRef } from "react";
import clsx from "clsx";

type InputNumberProps = {
  className?: string;
  style?: CSSProperties;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const InputNumber = ({ className, style, value, onChange, min, max }: InputNumberProps) => {
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
    <input
      ref={ref}
      className={clsx(
        "rounded border px-2 py-1 shadow-none outline-none transition-[box-shadow] hover:border-primary focus:border-primary-400 focus:ring",
        className,
      )}
      style={style}
      type="number"
      value={"" + value}
      onChange={handleValueChange}
      min={min}
      max={max}
    />
  );
};

export default InputNumber;
