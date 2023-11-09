"use client";

import { Transition } from "@headlessui/react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import useScrollPosition from "lib/useScrollPosition";

interface Props {
  label?: string;
}

export default function BackToTopButton({ label }: Props) {
  const scrollPosition = useScrollPosition();

  return (
    <Transition
      show={scrollPosition > 300}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex gap-1 items-center text-gray-500 hover:text-gray-800"
        >
          <ArrowUpCircleIcon className="h-6" />
          {label || "Tilbake til toppen"}
        </button>
      </div>
    </Transition>
  );
}
