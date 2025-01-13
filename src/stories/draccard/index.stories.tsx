import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { DracCard } from ".";
import { DracCardArgs } from "./_types";

const defaultArgs: DracCardArgs = {
  title: "Title",
  description: "Description",
  icon: <div>Icon</div>,
  price: {
    firstRow: {
      value: "First Row",
      isStrikeThrough: false,
    },
    value: "Value",
  },
  currentPrice: "Current Price",
  additionalInfo: [
    {
      icon: <div>Icon</div>,
      text: "Text",
    },
  ],
  background: "green",
};

const Template: Story<DracCardArgs> = (args) => {
  return <DracCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Atoms/DracCard",
  component: DracCard,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof DracCard>;
