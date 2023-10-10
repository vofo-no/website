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
      className={classNames("max-w-screen-xl w-full mx-auto my-4 lg:my-8", {
        "prose prose-base dark:prose-invert prose-a:text-blue-700 dark:prose-a:text-blue-200 dark:hover:prose-a:text-yellow-500 hover:prose-a:text-crimson-500 prose-h1:text-crimson-500 prose-headings:font-roboto prose-headings:font-medium prose-headings:leading-tight prose-headings:tracking-[.02em] prose-h2:mt-6 prose-h2:pt-4 prose-h2:first:mt-0 prose-h2:mb-2 prose-h3:mt-5 prose-h3:pt-2 prose-h3:mb-2":
          prose,
        "bg-white shadow": paper,
      })}
    >
      <div
        className={classNames("px-4 lg:px-8", className, {
          "py-4 lg:py-8": paper,
        })}
      >
        {children}
      </div>
    </div>
  );
}
