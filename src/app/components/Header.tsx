import Logo from "./Logo";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="mb-4 shadow-sm">
      <div className="container mx-auto flex items-center gap-4">
        <Logo />
        <Menu />
      </div>
    </header>
  );
}
