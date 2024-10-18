import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Dots } from ".";
import { theme } from "../../theme";
import { getColor } from "../../theme/utils";
import { DotsArgs } from "./_types";

const defaultArgs: DotsArgs = {
  size: "50",
};

const Template: Story<DotsArgs> = (args) => <Dots {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  color: getColor(theme.colors.primaryHue, 600),
};

export default {
  title: "Atoms/Loaders/Dots",
  component: Dots,
  argTypes: {
    size: {
      control: {
        type: "number",
      },
    },
    delayMS: {
      table: {
        disable: true,
      },
    },
    duration: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Dots>;
