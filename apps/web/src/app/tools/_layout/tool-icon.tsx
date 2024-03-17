import Image from "next/image";
import React from "react";

interface ToolIconProps {
  className?: string;
  style?: React.CSSProperties;
  name: string;
  path: string;
}

export function ToolIcon({ className, style, name, path }: ToolIconProps) {
  return (
    <Image
      className={className}
      style={style}
      width={16}
      height={16}
      src={`/tools/${path}/icon.svg`}
      alt={`${name}-logo`}
    />
  );
}
