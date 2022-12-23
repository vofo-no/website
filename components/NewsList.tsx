import React from "react";
import { NewsItemType } from "../lib/sanity.api";
import NewsItem from "./NewsItem";

interface NewsListsProps {
  items: Array<NewsItemType>;
}

export default function NewsList({ items = [] }: NewsListsProps) {
  if (items.length === 0) {
    return <p className="text-lg py-4 text-gray-500">Ingen saker</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
      {items.map((item) => (
        <NewsItem {...item} featured key={item._id} />
      ))}
    </div>
  );
}
