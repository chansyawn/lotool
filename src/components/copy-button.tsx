import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import useClipboard from "@/hooks/use-clipboard";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

type CopyButtonProps = (
  | { mode?: "sigle"; data: string | (() => string) }
  | {
      mode: "multiple";
      options: { key: string; label: React.ReactNode; data: string | (() => string) }[];
    }
) & {
  variant?: ButtonProps["variant"];
};

const CopyButton = ({ variant, ...props }: CopyButtonProps) => {
  const { copy, copied } = useClipboard();

  const Icon = copied ? CheckIcon : CopyIcon;

  if (props.mode === "multiple") {
    return (
      <Tooltip content="Copy to clipboard">
        <DropdownMenu
          align="end"
          options={props.options.map(({ key, label, data }) => ({
            key,
            label,
            onClick: () => copy(typeof data === "string" ? data : data()),
          }))}
        >
          <Button variant={variant} size="icon">
            <Icon />
          </Button>
        </DropdownMenu>
      </Tooltip>
    );
  }

  const { data } = props;

  return (
    <Tooltip content="Copy to clipboard">
      <Button
        variant={variant}
        size="icon"
        onClick={() => copy(typeof data === "string" ? data : data())}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};

export default CopyButton;
