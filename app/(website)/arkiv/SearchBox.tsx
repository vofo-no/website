"use client";

import Button from "components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface Props {
  name: string;
  value?: string | string[];
  label: string;
}

export default function SearchBox(props: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(String(props.value || ""));

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

  const submit = useCallback(() => {
    router.push(pathname + "?" + createQueryString(props.name, q));
  }, [createQueryString, pathname, props.name, q, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="max-w-prose flex mb-4"
    >
      <input
        type="search"
        name={props.name}
        placeholder={props.label}
        aria-label={props.label}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="block grow rounded-l border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <Button as="button" type="submit" className="rounded-l-none">
        Søk
      </Button>
    </form>
  );
}
