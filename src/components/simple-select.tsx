"use client";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";

type SelectProps = {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  options: { label: string; value: string }[];
} & React.ComponentProps<typeof Select>;

const SimpleSelect = ({ className, style, placeholder, options, ...props }: SelectProps) => {
  return (
    <Select {...props}>
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
    </Select>
  );
};

export default SimpleSelect;
