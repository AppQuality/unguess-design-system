import { ComponentMeta, Story } from "@storybook/react";
import { theme } from '../theme';
import { Logo } from ".";
import { LogoArgs } from "./_types";

const Template: Story<LogoArgs> = (args) => <Logo {...args} />

const defaultArgs: LogoArgs = Logo.defaultProps;
export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Atoms/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;
