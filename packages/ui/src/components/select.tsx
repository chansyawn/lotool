import {
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../primitives/select";

type SelectProps = {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  options: { label: string; value: string }[];
} & React.ComponentProps<typeof SelectRoot>;

export function Select({
  className,
  style,
  placeholder,
  options,
  ...props
}: SelectProps) {
  return (
    <SelectRoot {...props}>
      <SelectTrigger className={className} style={style}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
