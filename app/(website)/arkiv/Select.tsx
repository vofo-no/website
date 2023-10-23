"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  name: string;
  value?: string | string[];
  options: Array<{ value: string; title: string } | string>;
  label: string;
}

export default function Select(props: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <label>
        {props.label}
        <select
          name={props.name}
          value={props.value}
          onChange={(e) => {
            router.push(
              pathname + "?" + createQueryString(props.name, e.target.value)
            );
          }}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Velg {props.label.toLowerCase()}</option>
          <optgroup>
            {props.options.map((item) =>
              typeof item === "string" ? (
                <option key={item}>{item}</option>
              ) : (
                <option value={item.value} key={item.value}>
                  {item.title}
                </option>
              )
            )}
          </optgroup>
        </select>
      </label>
    </div>
  );
}
