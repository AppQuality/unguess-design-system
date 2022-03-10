import { ComponentMeta, Story } from "@storybook/react";
import { Span } from ".";
import { MD } from "../typescale";
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
} as ComponentMeta<typeof Span>;
