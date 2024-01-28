"use client";

import { ClipboardIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useClipboard from "@/hooks/use-clipboard";
import SimpleTooltip from "@/components/simple-tooltip";
import cn from "@/utils/cn";

type InputAreaProps = {
  style?: React.CSSProperties;
  className?: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  extra?: React.ReactNode;
};

const InputArea = ({
  style,
  className,
  title,
  value,
  onChange,
  placeholder,
  extra,
}: InputAreaProps) => {
  const { paste } = useClipboard();

  return (
    <div className={cn("flex flex-col", className)} style={style}>
      <div className="mb-1 flex items-center gap-1 px-1">
        <div className="mr-auto text-lg font-medium">{title}</div>
        {extra}
        <SimpleTooltip content="Paste from clipboard">
          <Button variant="ghost" size="icon" onClick={() => paste().then(onChange)}>
            <ClipboardIcon />
          </Button>
        </SimpleTooltip>
        <SimpleTooltip content="Clear content">
          <Button variant="ghost" size="icon" onClick={() => onChange("")}>
            <Cross1Icon />
          </Button>
        </SimpleTooltip>
      </div>
      <Textarea
        placeholder={placeholder}
        className="flex-1 resize-none break-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputArea;
