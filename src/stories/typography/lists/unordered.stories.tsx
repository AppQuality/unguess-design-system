import { ComponentMeta, Story } from "@storybook/react";
import { UnorderedList } from ".";
import { UnorderedListArgs } from "./_types";

const UnOrderedTemplate: Story<UnorderedListArgs> = ({ items, ...args }) => {
  return (
    <UnorderedList {...args}>
      {items &&
        items.map((item) => <UnorderedList.Item>{item}</UnorderedList.Item>)}
    </UnorderedList>
  );
};

const defaultArgs: UnorderedListArgs = {
  items: ["Item 1", "Item 2", "Item 3"],
};

export const Unordered = UnOrderedTemplate.bind({});
Unordered.args = defaultArgs as UnorderedListArgs;

export default {
  title: "Atoms/Typography/Lists",
  component: UnorderedList,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof UnorderedList>;
