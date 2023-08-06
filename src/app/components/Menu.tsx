import Link from "next/link";
import { RealTimeEmoji } from "../timestamp/components/RealTimeEmoji";

export default function Menu() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link href="/timestamp">
            <RealTimeEmoji />
            Timestamp
          </Link>
        </li>
      </ul>
    </nav>
  );
}
