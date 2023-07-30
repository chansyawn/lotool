import Link from "next/link";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/timestamp">Timestamp</Link>
        </li>
      </ul>
    </nav>
  );
}
