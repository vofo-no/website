import React from "react";
import NewsItem, { NewsItemProps } from "./NewsItem";

interface NewsListsProps {
  items: Array<NewsItemProps>;
}

export default function NewsList({ items = [] }: NewsListsProps) {
  if (items.length === 0) {
    return (
      <p className="text-lg text-center py-8 text-gray-500">Ingen saker</p>
    );
  }

  const featured = items.filter((item) => item.featured).slice(0, 3);
  const nonfeatured = items
    .filter((item) => !featured.includes(item))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
      {featured.map((item) => (
        <NewsItem {...item} featured key={item.date} />
      ))}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 md:col-span-3 lg:col-span-1 gap-8">
        {nonfeatured.map((item) => (
          <NewsItem {...item} featured={false} key={item.date} />
        ))}
      </div>
    </div>
  );
}
