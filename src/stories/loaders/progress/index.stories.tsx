import { ComponentMeta, Story } from "@storybook/react";
import { theme } from '../../theme';
import { Progress } from ".";
import { ProgressArgs } from "./_types";

const defaultArgs: ProgressArgs = {
  color: theme.colors.primaryHue,
  value: 50,
  size: 'medium'
};

const Template: Story<ProgressArgs> = (args) => <Progress {...args} />

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
        options: ['small', 'medium', 'large']
      }
    }
  }
} as ComponentMeta<typeof Progress>;
