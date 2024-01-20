import Link from "next/link";
import AppLogo from "@/app/icon.svg";

const Logo = () => {
  return (
    <span className="py-2 text-2xl">
      <Link href="/" className="flex items-center">
        <AppLogo className="mr-1 size-6" />
        <span className="ml-1">Lotool</span>
      </Link>
    </span>
  );
};

export default Logo;
