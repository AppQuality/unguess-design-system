import {
  Tabs as ZendeskTabs,
  TabList as ZendeskTabList,
  Tab as ZendeskTab,
  TabPanel as ZendeskTabPanel,
} from "@zendeskgarden/react-tabs";
import { forwardRef, useState } from "react";
import { TabsArgs } from "./_types";

/**
 * Use Tabs to organize related content in a single view. This helps users navigate related content without having to switch contexts.

 * Used for this:
    - To filter information into easily parsable views
    - To organize related content and controls within a single page

 * Not for this:
    - To guide users through a task list, use a Stepper instead
    - As a secondary navigation bar that spans multiple pages, use Anchors instead
 */
const TabsComponent = forwardRef<HTMLDivElement, TabsArgs>((props, ref) => {
  const [selectedTab, setSelectedTab] = useState(props.selectedItem);

  return (
    <ZendeskTabs
      ref={ref}
      {...props}
      selectedItem={selectedTab}
      onChange={(item) => {
         setSelectedTab(item);
         props.onChange?.(item);
      }}
    />
  );
});

const Tabs = TabsComponent as typeof TabsComponent & {
  List: typeof ZendeskTabList;
  Tab: typeof ZendeskTab;
  Panel: typeof ZendeskTabPanel;
};

Tabs.List = ZendeskTabList;
Tabs.Tab = ZendeskTab;
Tabs.Panel = ZendeskTabPanel;

export { Tabs };
