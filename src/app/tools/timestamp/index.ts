import { ToolConfig } from "../config";

export const config: ToolConfig = {
  path: "timestamp",
  name: "Timestamp",
  description: "Format timestamp",
  relatedLink: [
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
  ],
};
