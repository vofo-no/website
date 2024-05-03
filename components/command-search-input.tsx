import { useSearchBox } from "react-instantsearch";

import { CommandInput } from "@/components/ui/command";

export function CommandSearchInput() {
  const { query, refine } = useSearchBox();

  return (
    <CommandInput
      placeholder="Hva leter du etter?"
      value={query}
      onValueChange={refine}
      className="focus:ring-0 border-0"
    />
  );
}
