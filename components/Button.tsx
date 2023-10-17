import classNames from "classnames";

interface ButtonProps<T extends React.ElementType> {
  as?: T;
  color?: "primary" | "secondary";
  children?: React.ReactNode;
}

function getButtonColor(color?: "primary" | "secondary") {
  switch (color) {
    case "primary": {
      return "bg-crimson-500 hover:ring-crimson-800 text-white";
    }
    case "secondary": {
      return "bg-white hover:ring-gray-500 text-gray-900";
    }
  }
}

export default function Button<T extends React.ElementType = "button">({
  as,
  color = "primary",
  className,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as ?? "button";

  return (
    <Component
      {...props}
      className={classNames(
        className,
        getButtonColor(color),
        "rounded font-medium inline-block py-2 px-4 whitespace-nowrap overflow-hidden shrink text-ellipsis shadow transition hover:ring-1 hover:shadow-md active:shadow-sm"
      )}
    />
  );
}
