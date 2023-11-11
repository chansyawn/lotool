import Logo from "./Logo";
import Menu from "./Menu";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mb-4 w-full border-b border-b-neutral-bg bg-page">
      <div className="container mx-auto flex items-center gap-4 px-2">
        <Logo />
        <Menu />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
