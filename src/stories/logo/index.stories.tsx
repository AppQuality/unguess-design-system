import { ComponentMeta, Story } from "@storybook/react";
import { Logo } from ".";
import { LogoArgs } from "./_types";

const Template: Story<LogoArgs> = (args) => <Logo {...args} />

const defaultArgs: LogoArgs = {
  type: "horizontal",
  size: 150,
  style: {},
  className: ""
}

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Atoms/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;
