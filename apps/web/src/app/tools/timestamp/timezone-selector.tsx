"use client";

import React, { useRef, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
} from "@lotool/ui";
import { cn } from "@lotool/theme/utils";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";
import {
  getEtcTimezoneNameByOffset,
  getISOTimezoneNameByOffset,
} from "./utils";

interface TimezoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);
  const [utcMode, setUtcMode] = useState(
    Boolean(ALL_UTC_OFFSETS.find(({ value: timezone }) => timezone === value)),
  );
  const timezoneOptions = utcMode ? ALL_UTC_OFFSETS : SUPPORTED_TIMEZONES;
  const currentTimezone = timezoneOptions.find(
    ({ value: timezone }) => timezone === value,
  );
  if (!currentTimezone) {
    throw new Error(`Invalid timezone: ${value}`);
  }
  const lastSelectedTimezone = useRef(currentTimezone);

  const handleUtcModeChange = (utcMode: boolean) => {
    setUtcMode(utcMode);
    if (utcMode) {
      onChange(getEtcTimezoneNameByOffset(currentTimezone.offset));
    }
    // if last selected timezone is same as current timezone, revert back to last selected
    else if (lastSelectedTimezone.current.offset === currentTimezone.offset) {
      onChange(lastSelectedTimezone.current.value);
    } else {
      onChange(
        SUPPORTED_TIMEZONES.find(
          ({ offset }) => offset === currentTimezone.offset,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- temp
        )?.value ?? SUPPORTED_TIMEZONES[0]!.value,
      );
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
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          <span className="mr-auto truncate">{value}</span>
          <CaretSortIcon className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput
            className="border-b-0"
            placeholder="Search Timezone..."
          />
          <div className="flex items-center border-b p-2">
            <Switch
              id="utc-mode"
              checked={utcMode}
              onCheckedChange={handleUtcModeChange}
            />
            <Label htmlFor="utc-mode" className="ml-2 text-sm font-normal">
              Etc timezone
            </Label>
            {utcMode ? (
              <Button
                size="sm"
                className="ml-auto h-auto font-normal"
                variant="link"
                asChild
              >
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
          <CommandGroup className="max-h-56 overflow-y-auto">
            {timezoneOptions.map(({ label, value: timezone, offset }) => (
              <CommandItem
                key={timezone}
                value={timezone}
                onSelect={() => {
                  handleSelect(timezone);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2",
                    value === timezone ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="truncate">{label}</span>
                <Badge variant="outline" className="ml-2 whitespace-nowrap">
                  {getISOTimezoneNameByOffset(offset)}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
