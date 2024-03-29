import { CHARACTER_ENCODING_LIST, type CharacterEncoding } from "@lotool/lib/character-encoding";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lotool/ui";

interface CharacterEncodingSelectorProps {
  characterEncoding: CharacterEncoding;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
}

export function CharacterEncodingSelector({
  characterEncoding,
  onCharacterEncodingChange,
}: CharacterEncodingSelectorProps) {
  return (
    <Select
      value={characterEncoding}
      onValueChange={(value: CharacterEncoding) => {
        onCharacterEncodingChange(value);
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(CHARACTER_ENCODING_LIST).map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
