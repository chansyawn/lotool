import CurrentTimeEmoji from "./timestamp/current-time-emoji";

type Route = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export const ROUTES: Route[] = [
  {
    name: "Timestamp",
    href: "/timestamp",
    icon: <CurrentTimeEmoji />,
  },
  {
    name: "Awesome",
    href: "/awesome",
    icon: "⭐",
  },
];
