import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick: MouseEventHandler = (e) => {
    if (pathname === "/falsework") {
      e.preventDefault();
    }
    if (e.detail >= 5) {
      e.preventDefault();
      router.push("/falsework");
    }
  };

  return (
    <span className="py-2 text-2xl">
      <Link href="/">
        <span onClick={handleLogoClick}>📦</span>
        <span className="ml-1">Lotool</span>
      </Link>
    </span>
  );
}
