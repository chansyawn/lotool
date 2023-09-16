import Select from "@/components/Select";

type TimezoneSelectorProps = {
  value: number;
  onChange: (val: number) => void;
};

const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => idx - 11);

export default function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={ALL_UTC_OFFSETS.map((utcOffset) => ({
        label: `UTC${utcOffset >= 0 ? "+" : ""}${utcOffset}`,
        value: utcOffset,
      }))}
    />
  );
}
