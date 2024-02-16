import Logo from "./logo";
import ColorModeSelector from "./color-mode-selector";

const Header = () => {
  return (
    <header className="z-10 w-full border-b border-b-secondary bg-background px-2">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-4">
        <Logo />
        <ColorModeSelector />
      </div>
    </header>
  );
};

export default Header;
