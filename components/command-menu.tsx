"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";
import { InstantSearch } from "react-instantsearch";

import { indexName } from "@/lib/algolia/api";
import { client } from "@/lib/algolia/search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandDialog } from "@/components/ui/command";

import { CommandSearchInput } from "./command-search-input";
import { CommandSearchList } from "./command-search-list";

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router],
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative flex flex-1 gap-2 p-0 h-8 w-full ml-auto justify-start rounded-lg bg-background text-sm md:text-base font-normal text-muted-foreground max-w-60 md:max-w-80",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="ml-3 mr-auto truncate">Søk…</span>
        <span className="bg-primary text-primary-foreground h-full w-10 flex items-center justify-center rounded-e-lg">
          <SearchIcon className="h-5 w-5 shrink-0" />
        </span>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        description="Søk på vofo.no"
      >
        <InstantSearch searchClient={client} indexName={indexName}>
          <CommandSearchInput />
          <CommandSearchList callback={runCommand} />
        </InstantSearch>
      </CommandDialog>
    </>
  );
}
