"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { toPlainText } from "@portabletext/react";
import classNames from "classnames";
import slugify from "lib/slugify";

interface TocProps {
  headers?: any[];
  mobile?: boolean;
  title: string;
}

export default function Toc({ title, headers = [], mobile = false }: TocProps) {
  if (headers.length < 3) return null;

  if (mobile) {
    return (
      <div className="border mb-4 md:hidden print:hidden">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="h2"
                className="!my-0 p-4 flex justify-between cursor-pointer"
              >
                <small>{title}</small>
                <ChevronRightIcon
                  className={classNames("h-6 duration-150", {
                    "rotate-90 transform": open,
                  })}
                />
              </Disclosure.Button>
              <Disclosure.Panel as="ul" className="list-none px-4 pb-4 !mb-0">
                {headers.map((item) => {
                  const plain = toPlainText(item);
                  const anchor = slugify(plain);
                  return (
                    <li key={item._key} className="!pl-0 flex justify-start">
                      <a
                        href={`#${anchor}`}
                        className="relative pl-4 leading-normal"
                      >
                        <ChevronRightIcon className="w-5 top-0.5 -left-1 absolute" />
                        <span>{plain}</span>
                      </a>
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
    <div className="border p-4 mb-4 hidden md:block">
      <h2 className="!mt-0 !pt-0">
        <small>{title}</small>
      </h2>
      <ul className={`list-none !pl-0 !mb-0`}>
        {headers.map((item) => {
          const plain = toPlainText(item);
          const anchor = slugify(plain);
          return (
            <li key={item._key} className="!pl-0 flex justify-start">
              <a href={`#${anchor}`} className="relative pl-4 leading-normal">
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
