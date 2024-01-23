"use client";

import { Transition } from "@headlessui/react";
import { ArrowUpCircleIcon } from "lucide-react";

import useScrollPosition from "@/lib/useScrollPosition";

interface Props {
  label?: string;
}

export function BackToTopButton({ label }: Props) {
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
          className="inline-flex gap-1 items-center text-muted-foreground/80 hover:text-foreground hover:underline"
        >
          <ArrowUpCircleIcon className="h-6" />
          {label || "Tilbake til toppen"}
        </button>
      </div>
    </Transition>
  );
}
