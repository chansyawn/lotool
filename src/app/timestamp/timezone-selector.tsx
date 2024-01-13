"use client";

import React, { useRef, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { getUtcTimezoneNameByOffset } from "./utils";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import cn from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type TimezoneSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TimezoneSelector = ({ value, onChange }: TimezoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [utcMode, setUtcMode] = useState(
    ALL_UTC_OFFSETS.find(({ value: timezone }) => timezone === value) != null,
  );
  const timezoneOptions = utcMode ? ALL_UTC_OFFSETS : SUPPORTED_TIMEZONES;
  const currentTimezone = timezoneOptions.find(({ value: timezone }) => timezone === value)!;
  const lastSelectedTimezone = useRef(currentTimezone);

  const handleUtcModeChange = (utcMode: boolean) => {
    setUtcMode(utcMode);
    if (utcMode) {
      onChange(getUtcTimezoneNameByOffset(currentTimezone?.offset ?? 0));
      return;
    } else {
      // if last selected timezone is same as current timezone, revert back to last selected
      if (lastSelectedTimezone.current.offset === currentTimezone.offset) {
        onChange(lastSelectedTimezone.current.value);
      } else {
        onChange(
          SUPPORTED_TIMEZONES.find(({ offset }) => offset === currentTimezone.offset)?.value ??
            SUPPORTED_TIMEZONES[0].value,
        );
      }
    }
  };

  const handleSelect = (timezone: string) => {
    lastSelectedTimezone.current = currentTimezone;
    onChange(timezone);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full">
          <span className="mr-auto truncate">{value}</span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput className="border-b-0" placeholder="Search Timezone..." />
          <div className="flex items-center border-b p-2">
            <Switch id="utc-mode" checked={utcMode} onCheckedChange={handleUtcModeChange} />
            <Label htmlFor="utc-mode" className="ml-2 text-sm font-normal">
              UTC Offset Mode
            </Label>
          </div>
          <CommandEmpty>No timezone found.</CommandEmpty>
          <CommandGroup className="max-h-56 overflow-y-auto">
            {timezoneOptions.map(({ label, value: timezone, offset }) => (
              <CommandItem key={timezone} value={timezone} onSelect={() => handleSelect(timezone)}>
                <CheckIcon
                  className={cn("mr-2 h-4 w-4", value === timezone ? "opacity-100" : "opacity-0")}
                />
                <span className="truncate">{label}</span>
                {!utcMode && (
                  <Badge variant="outline" className="ml-2">
                    {getUtcTimezoneNameByOffset(offset)}
                  </Badge>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimezoneSelector;
