import { useInstantSearch } from "react-instantsearch";

import { resolveHref } from "@/lib/resolveHref";
import {
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Badge } from "./ui/badge";

function Tag({ typeName }: { typeName: string }) {
  if (typeName === "county")
    return <Badge className="bg-teal-600 hover:bg-teal-600">Fylke</Badge>;
  if (typeName === "topic")
    return <Badge className="bg-primary hover:bg-primary">Tema</Badge>;
}

export function CommandSearchList({
  callback,
}: {
  callback: (value: string) => void;
}) {
  const { results } = useInstantSearch();

  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      {results.hits.map((item) => (
        <CommandItem
          key={item.objectID}
          value={item.objectID}
          onSelect={() => callback(resolveHref(item._type, item.slug)!)}
        >
          <div className="flex flex-col w-full">
            <h2 className="font-semibold text-lg flex justify-between">
              <span className="line-clamp-1">{item.title}</span>
              <Tag typeName={item._type} />
            </h2>
            <p className="line-clamp-2">{item.description}</p>
          </div>
        </CommandItem>
      ))}
    </CommandList>
  );
}
