import React from "react";

import {
  Tabs as TabsBase,
  TabsList,
  TabsContent,
  TabsTrigger,
  TTabsTriggerProps,
  TabsProps,
} from "../tabs-base";

interface ITabsProps extends TabsProps {
  /**
   * List of props for TabsTrigger component
   */
  headersList: TTabsTriggerProps[];
  /**
   * List of children for TabsContent component.
   * Order of child should be according the order of items in headersList
   */
  children: React.ReactNode;
  /** The value of the tab to select by default, if uncontrolled.
   * If component uncontrolled and no value specified as default,
   *  this value will be set to the first item value from headersList
   * */
  defaultValue?: string;

  /**
   * Align tabs buttons (triggers)
   */
  tabsTriggerAlign?: "start" | "center" | "end";

  /**
   * Class for TabsContent component
   */
  tabsContentWrapperClass?: string;
}

/**
 * Tabs component wrapper around Radix UI Tabs primitive components
 */
export const Tabs = ({
  headersList,
  children,
  defaultValue = headersList[0].value,
  value,
  tabsTriggerAlign = "start",
  tabsContentWrapperClass,
  ...tabsProps
}: ITabsProps) => {
  const childrenArray = React.Children.toArray(children);
  let defaultV = typeof value !== "undefined" ? undefined : defaultValue;
  return (
    <TabsBase defaultValue={defaultV} value={value} {...tabsProps}>
      <TabsList alignment={tabsTriggerAlign}>
        {headersList.map((item) => (
          <TabsTrigger {...item} key={item.value} />
        ))}
      </TabsList>
      {childrenArray.map((child, ind) => {
        return (
          <TabsContent
            className={tabsContentWrapperClass}
            key={ind}
            value={headersList[ind].value}
          >
            {child}
          </TabsContent>
        );
      })}
    </TabsBase>
  );
};
