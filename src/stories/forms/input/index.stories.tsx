import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Input } from ".";
import { Label } from "../../label";
import { FormField as Field } from "../field";
import { InputArgs } from "./_types";

const defaultArgs: InputArgs = {
  isBare: false,
  focusInset: false,
};

const Template: Story<InputArgs> = (args) => {
  return (
    <Field>
      <Label isRegular={true}>Questa è la Label dell'Input</Label>
      <Input {...args} />
    </Field>
  );
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
  title: "Molecules/Forms/Input",
  component: Input,
} as ComponentMeta<typeof Input>;
