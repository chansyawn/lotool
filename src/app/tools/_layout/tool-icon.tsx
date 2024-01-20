import Image from "next/image";

type ToolIconProps = {
  className?: string;
  style?: React.CSSProperties;
  name: string;
  path: string;
};

const ToolIcon = ({ className, style, name, path }: ToolIconProps) => {
  return (
    <Image
      className={className}
      style={style}
      width={16}
      height={16}
      src={`/tools/${path}/icon.svg`}
      alt={`${name}-logo`}
    />
  );
};

export default ToolIcon;
