export interface NewsItemProps {
  category: "artikkel" | "arrangement" | "oppslag" | "dokument";
  title: string;
  description: string;
  date: string;
  featured?: boolean;
}

export default function NewsItem({
  category,
  title,
  description,
  date,
  featured,
}: NewsItemProps) {
  if (!featured)
    return (
      <a href="#" className="group block">
        <h3 className="text-lg text-blue-700 group-hover:underline font-semibold group-hover:text-crimson-500 mb-2 leading-6">
          {title}
        </h3>
        <p className="text-base text-gray-700">{description}</p>
        <p className="text-sm text-gray-500 mt-2">
          <>
            {date} ({category})
          </>
        </p>
      </a>
    );

  return (
    <a href="#" className="group block">
      <div className="aspect-video border border-gray-200 bg-gray-100 mb-2"></div>
      <h3 className="text-2xl text-blue-700 group-hover:underline font-semibold group-hover:text-crimson-500 mb-2 leading-8">
        {title}
      </h3>
      <p className="text-base text-gray-700">{description}</p>
      <p className="text-sm text-gray-500 mt-2">
        <>
          {date} ({category})
        </>
      </p>
    </a>
  );
}
