import Logo from "./logo";
import Menu from "./menu";
import ColorModeSelector from "./color-mode-selector";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mb-4 w-full border-b border-b-secondary bg-background">
      <div className="container flex items-center gap-4 px-2">
        <Logo />
        <Menu />
        <ColorModeSelector />
      </div>
    </header>
  );
};

export default Header;
