import { ComponentMeta, Story } from "@storybook/react";
import { Span } from ".";
import { SpanArgs } from "./_types";

const Template: Story<SpanArgs> = (args) => <Span {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Equum cibum est optimum prandium est",
  isBold: false,
  isMonospace: false,
};

export default {
  title: "Atoms/Typography/Span",
  component: Span,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Span>;
