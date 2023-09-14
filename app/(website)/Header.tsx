"use client";

import classNames from "classnames";
import Logo, { MobileLogo } from "components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "types";

const menuItems: MenuItem[] = [
  { title: "Studieforbund", url: "/studieforbund" },
  { title: "Politikk", url: "/politikk" },
  { title: "Om Vofo", url: "/om-vofo" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow h-14 md:h-24 flex items-center">
      <nav className="grow">
        <div className="mx-auto max-w-7xl md:px-4 lg:px-8">
          <div className="flex items-center px-2 md:px-0">
            <div className="md:-top-6 flex justify-center lg:grow-0 ml-2 lg:ml-0 md:mr-6">
              <Link href="/">
                <span className="sr-only">Voksenopplæringsforbundet</span>
                <Logo className="w-48 hidden md:block" />
                <MobileLogo className="md:hidden" />
              </Link>
            </div>
            <div className="grow md:hidden" />
            <div className="flex md:grow gap-4 md:mt-8 md:text-lg">
              {menuItems.map(({ url, title }) => (
                <Link
                  key={url}
                  href={url}
                  className={classNames(
                    "p-2 text-gray-950 hover:text-crimson-600 active:text-crimson-600 font-medium",
                    {
                      "underline decoration-crimson-500 underline-offset-8":
                        pathname.startsWith(url),
                    }
                  )}
                >
                  {title}
                </Link>
              ))}
            </div>
            <div className="md:mt-8 ml-4 hidden sm:block text-sm hover:text-crimson-600 active:text-crimson-600 hover:underline active:underline">
              <Link href="/kontakt">Kontakt oss</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
