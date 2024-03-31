"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lotool/ui";
import { useMemo } from "react";
import { useColorMode } from "./color-mode-context";

export function ColorModeSelector() {
  const [, setColorMode] = useColorMode();

  const colorModeOptions = useMemo(
    () => [
      {
        key: "light",
        label: "Light",
        onClick: () => {
          setColorMode("light");
        },
      },
      {
        key: "dark",
        label: "Dark",
        onClick: () => {
          setColorMode("dark");
        },
      },
      {
        key: "system",
        label: "System",
        onClick: () => {
          setColorMode("system");
        },
      },
    ],
    [setColorMode],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {colorModeOptions.map(({ key, label, onClick }) => (
          <DropdownMenuItem key={key} onClick={onClick}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
