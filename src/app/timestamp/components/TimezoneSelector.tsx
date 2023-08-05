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
    <div>
      <span className="text-sm">Timezone</span>
      {utcOffset !== undefined ? (
        <div className="p-1">
          {`UTC${utcOffset >= 0 ? "+" : ""}${utcOffset}`} {remark && `(${remark})`}
        </div>
      ) : (
        <Select
          className="w-22"
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
