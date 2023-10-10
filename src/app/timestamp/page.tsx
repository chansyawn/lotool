import dynamic from "next/dynamic";
import RealTimeEmoji from "./RealTimeEmoji";
import Tool from "@/layouts/tool";
import { RelatedLinkInfo } from "@/layouts/tool/RelatedLink";

const Timestamp = dynamic(() => import("./Timestamp"), { ssr: false });

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
    <Tool name="Timestamp" icon={<RealTimeEmoji />} relativeLink={TimestampRelatedLink}>
      <Timestamp />
    </Tool>
  );
};

export default TimestampPage;
