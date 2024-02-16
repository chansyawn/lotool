import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AWESOME_TOOLS } from "./awesome";
import icon from "./icon.svg";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const metadata: Metadata = {
  title: "Lotool - Awesome",
};

const TimestampPage = () => {
  return (
    <div className="flex-grow">
      <h1 className="mb-4 flex items-center text-3xl font-semibold">
        <Image className="size- mr-2" src={icon} alt="awesome-icon" />
        Awesome
      </h1>
      <div className="grid w-full grid-flow-row grid-cols-3 gap-x-5 gap-y-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {AWESOME_TOOLS.map(({ name, url, desc, icon }) => (
          <HoverCard key={name}>
            <HoverCardTrigger asChild>
              <Link
                href={url}
                className="flex w-fit items-center gap-1 rounded px-1 py-0.5 hover:bg-secondary"
              >
                {icon ? (
                  <Image className="size-5 rounded" src={icon} alt={`${name}-logo`} />
                ) : (
                  <GlobeIcon className="size-5" />
                )}
                <span className="truncate">{name}</span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col gap-2">
                {icon && <Image className="size-8" src={icon} alt={`${name}-logo`} />}
                <div className="font-medium">{name}</div>
                <div>{desc}</div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default TimestampPage;
