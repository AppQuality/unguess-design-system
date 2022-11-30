import { ComponentMeta, Story } from "@storybook/react";
import { Tabs } from "./index";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TabsArgs } from "./_types";


const Template: Story<TabsArgs> = (args) => (
  <Row>
    <Col>
      <Tabs {...args}>
        <Tabs.Panel title="Tab 1">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Tab 2">Tab 2 content</Tabs.Panel>
        <Tabs.Panel isDisabled title="Tab 3">Tab 3 content</Tabs.Panel>
      </Tabs>
    </Col>
  </Row>
);


export const Default = Template.bind({});
Default.args = {
  selectedIndex: 1,
  onTabChange: (index) => console.log("⭐ Tab:", index),
};

export default {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Tabs>;
