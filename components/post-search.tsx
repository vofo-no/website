"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectSeparator } from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostSearchProps {
  counties: { value: string; title: string }[];
  topics: { value: string; title: string }[];
  types: { value: string; title: string }[];
  years: string[];
}

interface SearchSelectProps {
  value: string | null;
  options: Array<{ value: string; title: string } | string>;
  label: string;
  callback: (value: string) => void;
}

export function SearchSelect({
  label,
  callback,
  value,
  options,
}: SearchSelectProps) {
  return (
    <Select value={value ?? ""} onValueChange={callback}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Velg ${label.toLocaleLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="-">(vis alle)</SelectItem>
          <SelectSeparator />
          {options.map((option) =>
            typeof option === "string" ? (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ) : (
              <SelectItem key={option.value} value={option.value}>
                {option.title}
              </SelectItem>
            ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function PostSearch(props: PostSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearch = useCallback(
    (name: string) => (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value && value !== "-") {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="flex flex-wrap gap-2">
      <SearchSelect
        label="Innholdstype"
        value={searchParams.get("type")}
        callback={updateSearch("type")}
        options={props.types}
      />
      <SearchSelect
        label="Fylke"
        value={searchParams.get("fylke")}
        callback={updateSearch("fylke")}
        options={props.counties}
      />
      <SearchSelect
        label="Tema"
        value={searchParams.get("tema")}
        callback={updateSearch("tema")}
        options={props.topics}
      />
      <SearchSelect
        label="Tidsperiode"
        value={searchParams.get("tid")}
        callback={updateSearch("tid")}
        options={props.years}
      />
    </div>
  );
}
