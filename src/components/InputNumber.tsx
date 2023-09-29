"use client";

import { CSSProperties, useEffect, useRef } from "react";
import Input from "./Input";

type InputNumberProps = {
  className?: string;
  style?: CSSProperties;
  value: number;
  onChange: (value: number) => void;
};

export default function InputNumber({ className, style, value, onChange }: InputNumberProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputDom = ref.current;
    if (!inputDom) return;

    const preventWheel: EventListener = (e) => e.stopPropagation();
    inputDom.addEventListener("wheel", preventWheel);

    return () => inputDom.removeEventListener("wheel", preventWheel);
  }, []);

  return (
    <Input
      ref={ref}
      className={className}
      style={style}
      type="number"
      value={"" + value}
      onChange={(value) => onChange(+value)}
    />
  );
}
