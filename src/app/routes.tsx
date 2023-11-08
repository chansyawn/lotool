import RealTimeEmoji from "./timestamp/RealTimeEmoji";

type Route = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export const ROUTES: Route[] = [
  {
    name: "Timestamp",
    href: "/timestamp",
    icon: <RealTimeEmoji />,
  },
  {
    name: "Awesome",
    href: "/awesome",
    icon: "⭐",
  },
];
