import { ComponentMeta, Story } from "@storybook/react";
import { Button } from "@zendeskgarden/react-buttons";
import { Tooltip } from ".";
import { TooltipArgs } from "./_types";

const defaultArgs: TooltipArgs = {
  content: "This is a tooltip",
  type: "light",
  size: "large",
  children: <Button>Button</Button>,
};

const Template: Story<TooltipArgs> = ({ children, ...args }) => {
  return <Tooltip {...args}>{children}</Tooltip>;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Atoms/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;
