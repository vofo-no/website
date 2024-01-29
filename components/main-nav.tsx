"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Logo, MobileLogo } from "@/components/logo";

const navItems = [
  { title: "Tema", href: "/tema" },
  { title: "Om Vofo", href: "/om-vofo" },
  { title: "Fylker", href: "/fylker" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex">
      <Link href="/" className="-ml-2 sm:ml-0 flex items-center">
        <Logo className="w-48 hidden md:block" />
        <MobileLogo className="md:hidden" />
        <span className="sr-only">Voksenopplæringsforbundet</span>
      </Link>
      <nav className="flex items-center gap-6 mx-6 text-sm md:text-lg md:gap-8 md:mx-10 lg:mx-14 whitespace-nowrap">
        {navItems.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "transition-colors hover:text-primary text-foreground",
              pathname.startsWith(href) &&
                "underline decoration-primary decoration-[3px] underline-offset-8",
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
