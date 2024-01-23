import { MainNav } from "@/components/main-nav";

import { CommandMenu } from "./command-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-auto">
      <div className="container flex h-14 md:h-24 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <CommandMenu />
        </div>
      </div>
    </header>
  );
}
