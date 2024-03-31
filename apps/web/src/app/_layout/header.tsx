import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@lotool/ui";
import { ColorModeSelector } from "@/features/color-mode/color-mode-selector";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="border-b-secondary bg-background z-10 w-full border-b px-2">
      <div className="container flex items-center">
        <Logo />
        <div className="flex ml-auto gap-1">
          <a href="https://github.com/chansyawn/lotool" target="_blank" rel="noopener">
            <Button variant="ghost" size="icon">
              <GitHubLogoIcon />
            </Button>
          </a>
          <ColorModeSelector />
        </div>
      </div>
    </header>
  );
}
