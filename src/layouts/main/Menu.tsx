import Link from "next/link";
import RealTimeEmoji from "@/app/timestamp/RealTimeEmoji";

const Menu = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link href="/timestamp">
            <RealTimeEmoji />
            <span className="ml-1">Timestamp</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
