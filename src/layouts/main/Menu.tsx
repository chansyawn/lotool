import Link from "next/link";
import RealTimeEmoji from "@/app/timestamp/RealTimeEmoji";

const ROUTES = [
  {
    name: "Timestamp",
    href: "/timestamp",
    icon: <RealTimeEmoji />,
  },
  {
    name: "Color",
    href: "/color",
    icon: "🎨",
  },
];

const Menu = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        {ROUTES.map(({ name, href, icon }) => (
          <li key={name}>
            <Link href={href} className="flex items-center gap-1">
              {icon}
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
