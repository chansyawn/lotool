"use client";

import clsx from "clsx";
import { CSSProperties } from "react";

type ButtonProps = {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "outline" | "dashed" | "text";
  size?: "sm" | "md";
};

export default function Button({
  className,
  style,
  children,
  onClick,
  variant = "outline",
  size = "md",
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded",
        {
          "border hover:bg-neutral-200": variant === "outline",
          "border border-dashed hover:bg-neutral-200": variant === "dashed",
        },
        {
          "px-1 text-sm": size === "sm",
          "px-2 py-1 text-base": size === "md",
        },
        className,
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
