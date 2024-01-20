import dynamic from "next/dynamic";
import { Metadata } from "next";
import CurrentTimeEmoji from "./current-time-emoji";
import Tool from "@/layouts/tool";
import { RelatedLinkInfo } from "@/layouts/tool/related-link";

const Timestamp = dynamic(() => import("."), { ssr: false });

export const metadata: Metadata = {
  title: "Lotool - Timestamp",
};

const TimestampRelatedLink: RelatedLinkInfo[] = [
  {
    type: "wiki",
    label: "Unix time",
    href: "https://en.wikipedia.org/wiki/Unix_time",
  },
  {
    type: "wiki",
    label: "Timezone database",
    href: "https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",
  },
];

const TimestampPage = () => {
  return (
    <Tool name="Timestamp" icon={<CurrentTimeEmoji />} relativeLink={TimestampRelatedLink}>
      <Timestamp />
    </Tool>
  );
};

export default TimestampPage;
