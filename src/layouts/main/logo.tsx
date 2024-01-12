import Link from "next/link";

const Logo = () => {
  return (
    <span className="py-2 text-2xl">
      <Link href="/">
        <span>📦</span>
        <span className="ml-1">Lotool</span>
      </Link>
    </span>
  );
};

export default Logo;
