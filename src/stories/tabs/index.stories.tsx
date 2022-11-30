import { ComponentMeta, Story } from "@storybook/react";
import { TabPanel } from "@zendeskgarden/react-tabs";
import { Tabs } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { CustomTabs } from "./customTabs";
import { CustomTabsArgs, TabsArgs } from "./_types";

const Template: Story<TabsArgs> = (args) => (
  <Row>
    <Col>
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Tab item="tab-1">Tab 1</Tabs.Tab>
          <Tabs.Tab item="tab-2">Tab 2</Tabs.Tab>
          <Tabs.Tab item="tab-3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel item="tab-1">Tab 1 content</Tabs.Panel>
        <Tabs.Panel item="tab-2">Tab 2 content</Tabs.Panel>
        <Tabs.Panel item="tab-3">Tab 3 content</Tabs.Panel>
      </Tabs>
    </Col>
  </Row>
);

const TemplateBuyedOnWish: Story<CustomTabsArgs> = (args) => (
  <Row>
    <Col>
      <CustomTabs {...args}>
        <TabPanel title="Tab 1">Tab 1 content</TabPanel>
        <TabPanel title="Tab 2">Tab 2 content</TabPanel>
        <TabPanel title="Tab 3">Tab 3 content</TabPanel>
      </CustomTabs>
    </Col>
  </Row>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  onChange: (item) => console.log(item),
};

export const Vertical = Template.bind({});
Vertical.args = {
  isVertical: true,
  selectedItem: "tab-1",
  onChange: (item) => console.log(item),
};

export const BuyedOnWish = TemplateBuyedOnWish.bind({});
BuyedOnWish.args = {
  selectedIndex: 2,
};

export default {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Tabs>;
