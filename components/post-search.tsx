"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectSeparator } from "@radix-ui/react-select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="grid grid-cols-2 md:grid-colds-4 gap-2">
      <form
        className="flex w-full col-span-2 md:col-span-4 items-center gap-2"
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
