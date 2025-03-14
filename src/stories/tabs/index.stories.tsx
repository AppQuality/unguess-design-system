import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TabsArgs } from "./_types";
import { Tabs } from "./index";

interface TabStoryArgs extends TabsArgs {
  items: { title: string; content: string; isDisabled?: boolean }[];
}

const Template: Story<TabStoryArgs> = (args) => (
  <Row>
    <Col>
      <Tabs {...args} className="tabs-wrapper">
        {args.items.map((item, index) => (
          <Tabs.Panel
            className={`tab-panel-${index}`}
            key={index}
            title={item.title}
            isDisabled={item.isDisabled}
          >
            {item.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Col>
  </Row>
);

const defaultArgs: TabStoryArgs = {
  selectedIndex: 1,
  onTabChange: (index) => console.log("⭐ Tab:", index),
  items: [],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  items: [
    { title: "Tab 1", content: "Tab 1 content" },
    { title: "Tab 2", content: "Tab 2 content" },
    { title: "Tab 3", content: "Tab 3 content" },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  items: [
    { title: "Tab 1", content: "Tab 1 content" },
    { title: "Tab 2", content: "Tab 2 content" },
    { title: "Tab 3", content: "Tab 3 content", isDisabled: true },
  ],
};

export default {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Tabs>;
