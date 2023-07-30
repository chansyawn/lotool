import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {};

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx("rounded border px-2 py-1 outline-2 outline-neutral-400 focus:outline", className)}
      {...props}
    />
  );
}
