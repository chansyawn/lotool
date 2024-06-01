import Link from "next/link";
import Image from "next/image";
import { cn } from "@lotool/theme/utils";
import logo from "@/app/icon.svg";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center text-2xl", className)}>
      <Image alt="logo" src={logo} className="mx-1 size-6" />
      <span className="ml-1">Lotool</span>
    </Link>
  );
}
