"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Button } from "@lotool/ui";
import { useColorMode } from "@/contexts/color-mode";

export function ColorModeSelector() {
  const [, setColorMode] = useColorMode();

  return (
    <DropdownMenu
      align="end"
      options={[
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
      ]}
    >
      <Button variant="ghost" size="icon" className="ml-auto">
        <SunIcon className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </Button>
    </DropdownMenu>
  );
}
