import classNames from "classnames";
import { PropsWithChildren } from "react";

export default function Container({
  children,
  className,
  prose,
  paper,
}: PropsWithChildren<{
  className?: string;
  prose?: boolean;
  paper?: boolean;
}>) {
  return (
    <div
      className={classNames(
        "max-w-7xl mx-auto my-8 md:my-10 lg:my-12 sm:px-4 lg:px-8",
        className,
        {
          "prose prose-base dark:prose-invert prose-a:text-blue-700 dark:prose-a:text-blue-200 dark:hover:prose-a:text-yellow-500 hover:prose-a:text-crimson-500 prose-h1:text-crimson-500 prose-headings:font-roboto prose-headings:font-medium prose-headings:leading-tight prose-headings:tracking-tight prose-h2:mt-6 prose-h2:pt-4 prose-h2:first:mt-0 prose-h2:mb-2":
            prose,
          "bg-white shadow p-4 lg:p-8": paper,
        }
      )}
    >
      {children}
    </div>
  );
}
