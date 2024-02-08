"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import {
  LineChartIcon,
  MapIcon,
  NewspaperIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [counties, setCounties] =
    React.useState<{ slug: string; title: string }[]>();
  const [topics, setTopics] =
    React.useState<{ slug: string; title: string; description?: string }[]>();

  React.useEffect(() => {
    if (!open) return;

    if (!counties) {
      fetch("/api/fylker")
        .then((res) => res.json())
        .then(({ data }) => {
          setCounties(data);
        });
    }

    if (!topics) {
      fetch("/api/tema")
        .then((res) => res.json())
        .then(({ data }) => {
          setTopics(data);
        });
    }
  }, [counties, open, topics]);

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

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex">Søk...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Hva leter du etter?"
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tema">
            {topics?.map((item) => (
              <CommandItem
                key={item.slug}
                onSelect={() =>
                  runCommand(() => router.push(`/tema/${item.slug}`))
                }
              >
                <StarIcon className="mr-2 h-4 w-4" />
                {item.title}
                <span className="sr-only"> {item.description}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {counties?.map((item) => (
            <CommandGroup heading={item.title} key={item.slug}>
              <CommandItem
                onSelect={() =>
                  runCommand(() => router.push(`/fylker/${item.slug}`))
                }
              >
                <MapIcon className="mr-2 h-4 w-4" />
                {item.title}
                <span className="sr-only"> fylkesutvalg</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  runCommand(() => router.push(`/aktuelt?fylke=${item.slug}`))
                }
              >
                <NewspaperIcon className="mr-2 h-4 w-4" />
                Aktuelt fra {item.title}
                <span className="sr-only"> fylkesutvalg</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  runCommand(() => router.push(`/statistikk/${item.slug}`))
                }
              >
                <LineChartIcon className="mr-2 h-4 w-4" />
                Statistikk for {item.title}
                <span className="sr-only"> fylke</span>
              </CommandItem>
            </CommandGroup>
          ))}
          <CommandGroup heading="Dokumenter og nyheter">
            <CommandItem
              onSelect={() => runCommand(() => router.push(`/aktuelt`))}
            >
              {" "}
              <NewspaperIcon className="mr-2 h-4 w-4" />
              Dokument- og nyhetsarkiv
            </CommandItem>
            {search && (
              <CommandItem
                onSelect={() =>
                  runCommand(() => router.push(`/aktuelt?q=${search}`))
                }
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Søk etter <q className="font-semibold italic mx-1">
                  {search}
                </q>{" "}
                i arkivet
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
