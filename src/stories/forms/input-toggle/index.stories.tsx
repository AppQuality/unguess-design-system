import { ComponentMeta, Story } from "@storybook/react";
import { InputToggle } from ".";
import { InputToggleArgs } from "./_types";

const defaultArgs: InputToggleArgs = {
  isBare: false,
  focusInset: false,
  label: "Titolo",
  message: "Messaggio",
  placeholder: "Placeholder",
  required: true,
};

const Template: Story<InputToggleArgs> = (args) => {
  return <InputToggle {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  isBare: false,
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  validation: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  ...defaultArgs,
  validation: "warning",
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  validation: "error",
};

export default {
  title: "Molecules/Forms/InputToggle",
  component: InputToggle,
} as ComponentMeta<typeof InputToggle>;
