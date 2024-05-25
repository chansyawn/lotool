"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Button,
  Switch,
  Label,
  Badge,
  ScrollArea,
} from "@lotool/ui";
import { cn } from "@lotool/theme/utils";
import { CheckIcon, ChevronsUpDownIcon, EarthIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";
import { getEtcTimezoneNameByOffset, getTimezoneOffset } from "./utils";
import { allETCTimezonesAtom, supportedTimezonesAtom } from "./atom";

interface TimezoneSelectorProps {
  timestamp: number;
  value?: string;
  onChange: (value: string) => void;
  trigger?: React.ReactNode;
}

export function TimezoneSelector({ timestamp, value, onChange, trigger }: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);
  const utcMode = Boolean(ALL_UTC_OFFSETS.find((timezone) => timezone === value));

  const supportedTimezones = useAtomValue(supportedTimezonesAtom);
  const allETCTimezones = useAtomValue(allETCTimezonesAtom);

  const timezoneOptions = utcMode ? allETCTimezones : supportedTimezones;
  const currentTimezone = timezoneOptions.find(({ label }) => label === value);

  const handleUtcModeChange = (utcMode: boolean) => {
    if (utcMode) {
      onChange(
        currentTimezone
          ? getEtcTimezoneNameByOffset(getTimezoneOffset(currentTimezone.label, timestamp))
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- already checked
            ALL_UTC_OFFSETS[0]!,
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- already checked
      onChange(SUPPORTED_TIMEZONES[0]!);
    }
  };

  const handleSelect = (timezone: string) => {
    onChange(timezone);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="secondary" size="sm" role="combobox" aria-expanded={open}>
            <EarthIcon className="mr-1 size-4" />
            <span className="mr-auto truncate">{value}</span>
            <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput className="border-b-0" placeholder="Search Timezone..." />
          <div className="flex items-center border-b p-2">
            <Switch id="utc-mode" checked={utcMode} onCheckedChange={handleUtcModeChange} />
            <Label htmlFor="utc-mode" className="ml-2 text-sm font-normal">
              Etc timezone
            </Label>
            {utcMode ? (
              <Button size="sm" className="ml-auto h-auto font-normal" variant="link" asChild>
                <a
                  href="https://en.wikipedia.org/wiki/Tz_database#Area"
                  target="_blank"
                  rel="noopener"
                >
                  Why sign is inverted?
                </a>
              </Button>
            ) : null}
          </div>
          <CommandEmpty>No timezone found.</CommandEmpty>
          <CommandGroup className="w-full">
            <ScrollArea className="h-56 w-full">
              {timezoneOptions.map(({ label, offset, dst }) => (
                <CommandItem
                  key={label}
                  value={label}
                  onSelect={() => {
                    handleSelect(label);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <CheckIcon
                      className={cn("size-4", value === label ? "opacity-100" : "opacity-0")}
                    />
                    <span className="truncate">{label}</span>
                    <Badge variant="outline">{offset}</Badge>
                    {dst ? <Badge variant="secondary">DST</Badge> : null}
                  </div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

TimezoneSelector.displayName = "TimezoneSelector";
