"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import cn from "@/utils/cn";

type ColorSliderProps = {
  className?: string;
  style?: React.CSSProperties;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  orientation?: "horizontal" | "vertical";
  trackBackground: string;
  thumbBackground: string;
};

const ColorSlider = ({
  className,
  style,
  value,
  onChange,
  min,
  max,
  step,
  orientation,
  trackBackground,
  thumbBackground,
}: ColorSliderProps) => {
  const handleValueChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className={className} style={style}>
      <SliderPrimitive.Root
        className={cn(
          "relative flex touch-none select-none items-center",
          orientation === "vertical" ? "h-full flex-col py-1" : "w-full px-1",
        )}
        value={[value]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative grow overflow-hidden rounded shadow-inner",
            orientation === "vertical" ? "h-full w-4" : "h-4 w-full",
          )}
          style={{ background: trackBackground }}
        >
          <SliderPrimitive.Range className="absolute h-full bg-transparent" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="box-content block h-4 w-4 rounded-full border-2 border-mode shadow focus-visible:outline-none"
          style={{ background: thumbBackground }}
        />
      </SliderPrimitive.Root>
    </div>
  );
};

export default ColorSlider;
