import { TEXT_ENCODING_LIST, type TextEncoding } from "@lotool/lib/text-encoding";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lotool/ui";

interface TextEncodingSelectorProps {
  value: TextEncoding;
  onValueChange: (value: TextEncoding) => void;
}

export function TextEncodingSelector({ value, onValueChange }: TextEncodingSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(value: TextEncoding) => {
        onValueChange(value);
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(TEXT_ENCODING_LIST).map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
