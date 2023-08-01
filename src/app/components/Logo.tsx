import Link from "next/link";

export default function Logo() {
  return (
    <span className="py-2 text-2xl">
      <Link href="/">
        📦<span className="ml-1">Tool</span>
      </Link>
    </span>
  );
}
