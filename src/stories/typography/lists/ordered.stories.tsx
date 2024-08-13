import { Meta, StoryFn } from "@storybook/react";
import { OrderedList } from ".";
import { OrderedListArgs } from "./_types";

const OrderedTemplate: StoryFn<OrderedListArgs> = ({ items, ...args }) => {
  return (
    <OrderedList {...args}>
      {items &&
        items.map((item) => <OrderedList.Item>{item}</OrderedList.Item>)}
    </OrderedList>
  );
};

const defaultArgs: OrderedListArgs = {
  items: ["Item 1", "Item 2", "Item 3"],
};

export const Ordered = OrderedTemplate.bind({});
Ordered.args = defaultArgs as OrderedListArgs;

export default {
  title: "Atoms/Typography/Lists",
  component: OrderedList,
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
} as Meta<typeof OrderedList>;
