import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Progress } from ".";
import { theme } from "../../theme";
import { getColor } from "../../theme/utils";
import { ProgressArgs } from "./_types";

const defaultArgs: ProgressArgs = {
  color: getColor(theme.colors.primaryHue, 600),
  value: 50,
  size: "medium",
};

const Template: Story<ProgressArgs> = (args) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Atoms/Loaders/Progress",
  component: Progress,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
} as ComponentMeta<typeof Progress>;
