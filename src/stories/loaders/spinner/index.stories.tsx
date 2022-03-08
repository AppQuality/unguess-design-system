import { ComponentMeta, Story } from "@storybook/react";
import { theme } from '../../theme';
import { Spinner } from ".";
import { SpinnerArgs } from "./_types";

const defaultArgs: SpinnerArgs = {
  size: '50'
};

const Template: Story<SpinnerArgs> = (args) => <Spinner {...args} />

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  color: theme.colors.primaryHue
};

export default {
  title: "Atoms/Loaders/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: {
        type: "number"
      }
    },
    delayMS: {
      table: {
        disable: true
      }
    },
    duration: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof Spinner>;
