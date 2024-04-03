"use client";

import { useMemo } from "react";
import { Disclosure } from "@headlessui/react";
import { toPlainText } from "@portabletext/react";
import classNames from "classnames";
import { ChevronRightIcon } from "lucide-react";

import slugify from "@/lib/slugify";
import { useHeadersObserver } from "@/lib/useHeadersObserver";
import { cn } from "@/lib/utils";

interface TocProps {
  headers?: any[];
  mobile?: boolean;
  title: string;
}

export function Toc({ title, headers = [], mobile = false }: TocProps) {
  const slugs = useMemo(
    () => headers?.map(toPlainText).map(slugify),
    [headers],
  );
  const activeHeaderId = useHeadersObserver(slugs);

  if (!(headers?.length > 2)) return null;

  if (mobile) {
    return (
      <div className="-mx-4 mb-4 shadow-sm border border-border md:hidden print:hidden sticky top-14 bg-accent text-accent-foreground not-prose">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="h2"
                className="px-4 py-3 text-lg font-semibold flex justify-between cursor-pointer"
              >
                <small>{title}</small>
                <ChevronRightIcon
                  className={classNames("h-6 duration-150", {
                    "rotate-90 transform": open,
                  })}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                as="ul"
                className="px-4 pb-4 flex flex-col gap-2"
              >
                {headers.map((item) => {
                  const plain = toPlainText(item);
                  const anchor = slugify(plain);
                  return (
                    <li key={item._key} className="flex justify-start">
                      <Disclosure.Button
                        as="a"
                        href={`#${anchor}`}
                        className={cn(
                          "relative pl-4 leading-tight hover:underline",
                          anchor === activeHeaderId && "font-semibold",
                        )}
                      >
                        <ChevronRightIcon className="w-5 top-0.5 -left-1 absolute" />
                        <span>{plain}</span>
                      </Disclosure.Button>
                    </li>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    );
  }

  return (
    <div className="border p-4 mb-4 hidden md:block not-prose">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="pt-2 flex flex-col gap-2">
        {headers.map((item) => {
          const plain = toPlainText(item);
          const anchor = slugify(plain);
          return (
            <li key={item._key} className="flex justify-start">
              <a
                href={`#${anchor}`}
                className={cn(
                  "relative pl-4 leading-tight hover:underline",
                  anchor === activeHeaderId && "font-semibold",
                )}
              >
                <ChevronRightIcon className="w-5 top-0.5 -left-1 absolute" />
                <span>{plain}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
