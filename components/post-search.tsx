"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostSearchProps {
  counties: { value: string; title: string }[];
  topics: { value: string; title: string }[];
  types: { value: string; title: string }[];
  years: string[];
}

type SelectOption = { value: string; title: string } | string;

interface SearchSelectProps {
  value: string | null;
  options: SelectOption[] | Record<string, SelectOption[]>;
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
        <SelectItem value="-">(vis alle)</SelectItem>
        <SelectSeparator />
        {Array.isArray(options) ? (
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
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
        ) : (
          Object.keys(options).map((groupName, index) => (
            <React.Fragment
              key={`post-search-${label}-select-group-${groupName}`}
            >
              {index > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel>{groupName}</SelectLabel>
                {options[groupName].map((option) =>
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
            </React.Fragment>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

export function PostSearch(props: PostSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams]);

  const updateSearch = useCallback(
    (name: string) => (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value && value !== "-") {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      q ? params.set("q", q) : params.delete(q);

      router.push(pathname + "?" + params.toString());
    },
    [pathname, q, router, searchParams],
  );

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex w-full items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          updateSearch("q")(q);
        }}
      >
        <Input
          aria-label="Søkeord"
          placeholder="Søk etter..."
          className="text-base"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button type="submit">Søk</Button>
      </form>
      <div className="flex flex-wrap gap-2">
        <SearchSelect
          label="Innholdstype"
          value={searchParams.get("type")}
          callback={updateSearch("type")}
          options={props.types}
        />
        <SearchSelect
          label="Tema eller fylke"
          value={searchParams.get("filter")}
          callback={updateSearch("filter")}
          options={{ Tema: props.topics, Fylke: props.counties }}
        />
        <SearchSelect
          label="Tidsperiode"
          value={searchParams.get("tid")}
          callback={updateSearch("tid")}
          options={props.years}
        />
      </div>
    </div>
  );
}
