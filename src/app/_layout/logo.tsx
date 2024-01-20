import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.svg";

const Logo = () => {
  return (
    <span className="py-2 text-2xl">
      <Link href="/" className="flex items-center">
        <Image alt="logo" src={logo} className="mr-1 size-6" />
        <span className="ml-1">Lotool</span>
      </Link>
    </span>
  );
};

export default Logo;
