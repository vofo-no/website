"use client";

import { ComponentProps, useState } from "react";
import { Tab, TabGroup, TabList } from "@tremor/react";

import { ExpandableBarList } from "./expandable-bar-list";

interface TabBarListProps
  extends Pick<ComponentProps<typeof ExpandableBarList>, "initial" | "name"> {
  variant: "line" | "solid";
  tabs: string[];
  values?: string[];
  options?: Intl.NumberFormatOptions[];
  data: { name: string; values: number[] }[];
}

export function TabBarList({
  tabs,
  values = [],
  options = [],
  data,
  variant,
  ...rest
}: TabBarListProps) {
  const [tab, setTab] = useState(0);

  return (
    <TabGroup onIndexChange={setTab} index={tab}>
      <TabList variant={variant}>
        {tabs.map((tab) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>
      <ExpandableBarList
        {...rest}
        value={values[tab] || tabs[tab]}
        data={data.map(({ name, values }) => ({ name, value: values[tab] }))}
        formatOptions={options[tab]}
      />
    </TabGroup>
  );
}
