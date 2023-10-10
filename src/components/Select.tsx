"use client";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { CSSProperties, Fragment, ReactNode } from "react";

type SelectProps<T> = {
  className?: string;
  style?: CSSProperties;
  value: T;
  onChange: (val: T) => void;
  options: { label: ReactNode; value: T }[];
  getKey?: (val: T) => string;
};

const Select = <T,>({ className, style, value, onChange, options, getKey }: SelectProps<T>) => {
  const optionSelected = options.find(({ value: optionValue }) => optionValue === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={clsx("relative w-full", className)} style={style}>
        <Listbox.Button
          className={({ open }) =>
            clsx(
              "relative w-full cursor-pointer rounded border p-1 pl-2 pr-6 outline-none hover:border-primary",
              { "border-primary ring": open },
            )
          }
        >
          <span className="block truncate text-left">{optionSelected?.label ?? ""}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
            <ChevronUpDownIcon className="h-5 w-5 pr-1 text-neutral-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1.5 max-h-60 w-full overflow-auto rounded-md bg-background py-0.5 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map(({ label, value }) => (
              <Listbox.Option
                key={getKey ? getKey(value) : String(value)}
                className={"relative cursor-pointer select-none px-1 py-0.5"}
                value={value}
              >
                {({ selected, active }) => (
                  <span
                    className={clsx(
                      "block truncate rounded p-1",
                      { "bg-neutral-100": active },
                      { "bg-primary-100 font-medium": selected },
                    )}
                  >
                    {label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
