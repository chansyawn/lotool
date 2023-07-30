import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { CSSProperties, Fragment } from "react";

type SelectProps<T> = {
  className?: string;
  style?: CSSProperties;
  value: T;
  onChange: (val: T) => void;
  options: { label: string; value: T }[];
  getKey?: (val: T) => string;
};

export default function Select<T>({ className, style, value, onChange, options, getKey }: SelectProps<T>) {
  const optionSelected = options.find(({ value: optionValue }) => optionValue === value);

  return (
    <div className={className} style={style}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={({ open }) =>
              clsx("relative w-full cursor-default rounded border p-1 pl-2 pr-6 outline-2 outline-neutral-400", {
                outline: open,
              })
            }
          >
            <span className="block truncate text-left">{optionSelected?.label ?? ""}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <ChevronUpDownIcon className="h-5 w-5 pr-1 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map(({ label, value }) => (
                <Listbox.Option
                  key={getKey ? getKey(value) : String(value)}
                  className={({ active }) => clsx("relative cursor-pointer select-none p-2", { "bg-gray-100": active })}
                  value={value}
                >
                  {({ selected }) => (
                    <span className={clsx(`block truncate`, { "font-medium": selected })}>{label}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
