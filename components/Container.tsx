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
        "prose prose-gray dark:prose-invert": prose,
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
