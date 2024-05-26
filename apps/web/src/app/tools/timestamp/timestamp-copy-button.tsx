import { Badge } from "@lotool/ui";
import { CopyButton } from "@/components/copy-button";
import { getTimezoneOffset } from "./utils";

const getIntlDateTimeFormatterPreset = (preset: "full" | "long" | "medium" | "short") => ({
  label: `Intl-${preset}`,
  formatter: (value: number, timezone: string) =>
    new Intl.DateTimeFormat(undefined, {
      dateStyle: preset,
      timeStyle: preset,
      timeZone: timezone,
    }).format(value),
});

export const TIME_FORMATTER: {
  label: string;
  formatter: (value: number, timezone: string) => string;
}[] = [
  {
    label: "ISO",
    formatter: (value, timezone) =>
      new Date(value - getTimezoneOffset(timezone, value) * 6e4).toISOString(),
  },
  getIntlDateTimeFormatterPreset("short"),
  getIntlDateTimeFormatterPreset("medium"),
  getIntlDateTimeFormatterPreset("long"),
  getIntlDateTimeFormatterPreset("full"),
];

interface TimestampCopyButtonProps {
  timestamp: number;
  timezone: string;
}

export function TimestampCopyButton({ timestamp, timezone }: TimestampCopyButtonProps) {
  const options = TIME_FORMATTER.map(({ label, formatter }) => {
    const value = formatter(timestamp, timezone);

    return {
      key: label,
      label: (
        <span>
          {value} <Badge variant="secondary">{label}</Badge>
        </span>
      ),
      data: value,
    };
  });

  return <CopyButton mode="multiple" options={options} variant="secondary" />;
}
