import { Logo } from "./logo";
import { ColorModeSelector } from "./color-mode-selector";

export function Header() {
  return (
    <header className="border-b-secondary bg-background z-10 w-full border-b px-2">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-4">
        <Logo />
        <ColorModeSelector />
      </div>
    </header>
  );
}
