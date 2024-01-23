"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
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
  CommandSeparator,
} from "@/components/ui/command";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

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
        <CommandInput placeholder="Hva leter du etter?" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => alert("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => alert("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => alert("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
