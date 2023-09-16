"use client";

import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef } from "react";
import clsx from "clsx";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ className, type, ...props }: InputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputDom = ref.current;
    if (!inputDom || type !== "number") return;

    const preventWheel: EventListener = (e) => e.stopPropagation();
    inputDom.addEventListener("wheel", preventWheel);

    return () => inputDom.removeEventListener("wheel", preventWheel);
  }, [type]);

  return (
    <input
      ref={ref}
      className={clsx("rounded border border-neutral-300 px-2 py-1 outline-neutral-400 focus:outline", className)}
      type={type}
      {...props}
    />
  );
}
