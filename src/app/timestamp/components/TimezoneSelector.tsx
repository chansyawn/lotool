import Select from "@/components/Select";

type TimezoneSelectorProps = {
  utcOffset?: number;
  remark?: string;
  value: number;
  onChange: (val: number) => void;
};

const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => idx - 11);

export default function TimezoneSelector({ utcOffset, remark, value, onChange }: TimezoneSelectorProps) {
  return (
    <div className="w-24">
      <span className="text-sm">Timezone</span>
      {utcOffset !== undefined ? (
        <div className="flex items-center p-1">
          {`UTC${utcOffset >= 0 ? "+" : ""}${utcOffset}`}
          <span className="ml-1 text-xs">{remark && `${remark}`}</span>
        </div>
      ) : (
        <Select
          value={value}
          onChange={onChange}
          options={ALL_UTC_OFFSETS.map((utcOffset) => ({
            label: `UTC${utcOffset >= 0 ? "+" : ""}${utcOffset}`,
            value: utcOffset,
          }))}
        />
      )}
    </div>
  );
}
