import { ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { RegionItemType, TopicItemType } from "../lib/sanity.api";

interface RelevanceLinkProps {
  item: RegionItemType | TopicItemType;
}

export default function RelevanceLink({ item }: RelevanceLinkProps) {
  return (
    <p>
      Mer om:{" "}
      <Link href="#" className="no-underline">
        {item.name}
        <ChevronRightIcon className="w-5 h-5 inline-block ml-1" />
      </Link>
    </p>
  );
}
