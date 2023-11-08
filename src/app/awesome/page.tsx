import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { AWESOME_TOOLS } from "./awesome";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/HoverCard";

export const metadata: Metadata = {
  title: "Lotool - Timestamp",
};

const TimestampPage = () => {
  return (
    <main className="flex-grow">
      <h1 className="mb-4 text-3xl font-semibold">
        ⭐<span className="ml-1">Awesome</span>
      </h1>
      <section className="grid w-full grid-flow-row grid-cols-3 gap-x-5 gap-y-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {AWESOME_TOOLS.map(({ name, url, desc, icon }) => (
          <HoverCard key={name}>
            <HoverCardTrigger asChild>
              <Link
                href={url}
                className="flex w-fit items-center gap-1 rounded px-1 py-0.5 hover:bg-neutral-bg-hover"
              >
                {icon ? (
                  <Image className="h-5 w-5 rounded" src={icon} alt={`${name}-logo`} />
                ) : (
                  <GlobeAltIcon className="h-5 w-5" />
                )}
                <span className="truncate">{name}</span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col gap-2">
                {icon && <Image className="h-8 w-8" src={icon} alt={`${name}-logo`} />}
                <div className="font-medium">{name}</div>
                <div>{desc}</div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </section>
    </main>
  );
};

export default TimestampPage;
