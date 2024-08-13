import { Meta, StoryFn } from "@storybook/react";
import { Logo } from ".";
import { LogoArgs } from "./_types";

const Template: StoryFn<LogoArgs> = (args) => <Logo {...args} />;

const defaultArgs: LogoArgs = {
  type: "horizontal",
  size: 150,
  style: {},
  className: "",
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Atoms/Logo",
  component: Logo,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Logo>;
