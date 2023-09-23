import Logo from "./Logo";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 mb-4 w-full bg-background shadow-sm">
      <div className="container mx-auto flex items-center gap-4">
        <Logo />
        <Menu />
      </div>
    </header>
  );
}
