import Link from "next/link";
import Image from "next/image";
import { cn } from "@lotool/theme/utils";
import logo from "@/app/icon.svg";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("py-2 text-2xl", className)}>
      <Link href="/" className="flex items-center">
        <Image alt="logo" src={logo} className="mx-1 size-6" />
        <span className="ml-1">Lotool</span>
      </Link>
    </span>
  );
}
