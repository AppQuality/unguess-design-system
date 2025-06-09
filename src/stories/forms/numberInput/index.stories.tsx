import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { NumberInput } from ".";

export default {
  title: "Atoms/Forms/NumberInput",
  component: NumberInput,
  argTypes: {
    value: { control: { type: "number" }, defaultValue: 0 },
    min: { control: { type: "number" }, defaultValue: 0 },
    max: { control: { type: "number" }, defaultValue: 100 },
    step: { control: { type: "number" }, defaultValue: 5 },
    disabled: { control: { type: "boolean" }, defaultValue: false },
  },
} as ComponentMeta<typeof NumberInput>;

const Template: Story<any> = (args) => <NumberInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 50,
  min: 0,
  max: 100,
  step: 5,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
