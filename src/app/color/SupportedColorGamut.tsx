"use client";

import { CheckCircleIcon, ComputerDesktopIcon, XCircleIcon } from "@heroicons/react/20/solid";
import useMediaQuery from "@/hooks/useMediaQuery";
import cn from "@/utils/cn";

const SupportedColorGamut = () => {
  const supportSRGB = useMediaQuery("(color-gamut: srgb)");
  const supportDisplayP3 = useMediaQuery("(color-gamut: p3)");
  const supportRec2020 = useMediaQuery("(color-gamut: rec2020)");

  const deviceColorGamutSupport = [
    { name: "sRGB", support: supportSRGB },
    { name: "Display P3", support: supportDisplayP3 },
    { name: "rec2020", support: supportRec2020 },
  ];

  return (
    <section className="flex gap-1">
      <span className="inline-flex items-center rounded bg-neutral-bg px-1 font-medium">
        <ComputerDesktopIcon className="mr-0.5 inline h-4 w-4" />
        Supported Gamut
      </span>
      {deviceColorGamutSupport.map(({ name, support }) => (
        <span
          key={name}
          className={cn("inline-flex items-center rounded px-1 font-medium", {
            "bg-error-bg text-error-text": !support,
            "bg-success-bg text-success-text": support,
          })}
        >
          {name}
          {support ? (
            <CheckCircleIcon className="ml-0.5 inline h-4 w-4" />
          ) : (
            <XCircleIcon className="ml-0.5 inline h-4 w-4" />
          )}
        </span>
      ))}
    </section>
  );
};

export default SupportedColorGamut;
