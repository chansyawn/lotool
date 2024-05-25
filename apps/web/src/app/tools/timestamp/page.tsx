"use client";

import React from "react";
import { useAtom } from "jotai";
import { Button } from "@lotool/ui";
import { PlusCircleIcon } from "lucide-react";
import { CurrentTime } from "./current-time";
import { granularityAtom, timezoneAtomsAtom } from "./persist";
import { TimeBreakdownWithCustomTimezone, TimeBreakdownWithFixedTimezone } from "./time-breakdown";
import { timestampAtom } from "./atom";
import { TimestampInput } from "./timestamp-input";

function Page() {
  const [timezoneAtoms, dispatchTimezones] = useAtom(timezoneAtomsAtom);
  const [timestamp, setTimestamp] = useAtom(timestampAtom);
  const [granularity, setGranularity] = useAtom(granularityAtom);

  const handleAddTimezone = () => {
    dispatchTimezones({
      type: "insert",
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  return (
    <>
      <CurrentTime />
      <TimestampInput
        timestamp={timestamp}
        onTimestampChange={setTimestamp}
        granularity={granularity}
        onGranularityChange={setGranularity}
      />
      <div className="mt-3 flex flex-col gap-2">
        <TimeBreakdownWithFixedTimezone
          value={timestamp}
          onChange={setTimestamp}
          timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        <TimeBreakdownWithFixedTimezone
          value={timestamp}
          onChange={setTimestamp}
          timezone="Etc/UTC"
        />
        {timezoneAtoms.map((atom, idx) => (
          // eslint-disable-next-line react/no-array-index-key -- key is the order of array there
          <React.Fragment key={idx}>
            <TimeBreakdownWithCustomTimezone
              value={timestamp}
              onChange={setTimestamp}
              timezoneAtom={atom}
              onRemove={() => {
                dispatchTimezones({ type: "remove", atom });
              }}
            />
          </React.Fragment>
        ))}
      </div>
      <Button size="sm" className="mt-2" onClick={handleAddTimezone}>
        <PlusCircleIcon className="mr-1 size-4" />
        Add timezone
      </Button>
    </>
  );
}

export default Page;
