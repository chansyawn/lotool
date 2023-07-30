import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

export const supportTimestampPrecisions = ["second", "millisecond"] as const;
export type TimestampPrecision = (typeof supportTimestampPrecisions)[number];

type TimestampPrecisionSwitcherProps = {
  value: boolean;
  onChange: (val: boolean) => void;
};

export default function TimestampPrecisionSwitcher({ value, onChange }: TimestampPrecisionSwitcherProps) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Option value={false} className="inline cursor-pointer">
        {({ checked }) => <span className={clsx("px-1", { "rounded bg-gray-200 font-medium": checked })}>seconds</span>}
      </RadioGroup.Option>
      <span className="px-1">/</span>
      <RadioGroup.Option value={true} className="inline cursor-pointer">
        {({ checked }) => (
          <span className={clsx("px-1", { "rounded bg-gray-200 font-medium": checked })}>milliseconds</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}
