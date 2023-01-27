import { ComponentMeta, Story } from "@storybook/react";
import { theme } from '../../theme';
import { Dots } from ".";
import { DotsArgs } from "./_types";

const defaultArgs: DotsArgs = {
  size: '50'
};

const Template: Story<DotsArgs> = (args) => <Dots {...args} />

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  color: theme.colors.primaryHue
};

export default {
  title: "Atoms/Loaders/Dots",
  component: Dots,
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
} as ComponentMeta<typeof Dots>;
