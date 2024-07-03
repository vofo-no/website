import { SelectProps } from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageHeaderDescriptionInlineSelectProps extends SelectProps {
  defaultValue: string;
  selectAllLabel?: string;
  groupLabel: string;
  options: string[] | string[][];
}

export function PageHeaderDescriptionInlineSelect({
  selectAllLabel,
  groupLabel,
  options,
  ...rest
}: PageHeaderDescriptionInlineSelectProps) {
  return (
    <Select {...rest}>
      <SelectTrigger className="w-auto inline-flex px-0 border-0 text-amber-700 underline decoration-dashed underline-offset-4 group">
        <span className="text-lg font-semibold sm:text-xl pl-2">
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {selectAllLabel && (
          <SelectGroup>
            <SelectItem value={rest.defaultValue}>{selectAllLabel}</SelectItem>
          </SelectGroup>
        )}
        <SelectGroup>
          <SelectLabel>{groupLabel}:</SelectLabel>
          {options.map((item) => {
            const [value, label] = Array.isArray(item) ? item : [item, item];
            return (
              <SelectItem value={value} key={value}>
                {label || value}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
