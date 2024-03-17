import React, { forwardRef } from "react";
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../primitives/dropdown-menu";

interface DropdownMenuProps {
  className?: string;
  style?: React.CSSProperties;
  options: { key: string; label: React.ReactNode; onClick: () => void }[];
  children?: React.ReactNode;
  align?: DropdownMenuContentProps["align"];
}

export const DropdownMenu = forwardRef<HTMLButtonElement, DropdownMenuProps>(
  ({ className, style, options, children, align }, ref) => {
    return (
      <DropdownMenuRoot>
        <DropdownMenuTrigger
          asChild
          className={className}
          ref={ref}
          style={style}
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {options.map(({ key, label, onClick }) => (
            <DropdownMenuItem key={key} onClick={onClick}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    );
  },
);

DropdownMenu.displayName = "DropdownMenu";
