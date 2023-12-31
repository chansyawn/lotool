"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import Button from "@/components/Button";
import useColorMode from "@/hooks/useColorMode";

const ThemeSwitcher = () => {
  const [, setColorMode] = useColorMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto">
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setColorMode("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorMode("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorMode("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
