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
  href?: string;
  target?: string;
};

const Button = ({
  className,
  style,
  children,
  onClick,
  variant = "outline",
  size = "md",
  href,
  target,
}: ButtonProps) => {
  const _className = clsx(
    "rounded",
    {
      "border hover:bg-neutral-100 active:bg-neutral-200": ["outline", "dashed"].includes(variant),
      "border-dashed": variant === "dashed",
      "hover:bg-neutral-100 active:bg-neutral-200": variant === "text",
    },
    {
      "px-1": size === "sm",
      "px-2 py-1": size === "md",
    },
    className,
  );

  if (href) {
    return (
      <a className={_className} style={style} onClick={onClick} href={href} target={target}>
        {children}
      </a>
    );
  }

  return (
    <button className={_className} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
