import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { CodeVerifier } from ".";
import { CodeVerifierArgs } from "./_types";

const defaultArgs: CodeVerifierArgs = {
  length: 6,
  type: "numeric",
  disabled: false,
};

const Template: Story<CodeVerifierArgs> = (args) => <CodeVerifier {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Alphanumeric = Template.bind({});
Alphanumeric.args = {
  ...defaultArgs,
  type: "alphanumeric",
};

export const FourDigits = Template.bind({});
FourDigits.args = {
  ...defaultArgs,
  length: 4,
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

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export default {
  title: "Molecules/Forms/CodeVerifier",
  component: CodeVerifier,
  argTypes: {
    type: {
      control: "select",
      options: ["numeric", "alphanumeric"],
    },
    length: {
      control: { type: "number", min: 1, max: 10 },
    },
    validation: {
      control: "select",
      options: [undefined, "success", "warning", "error"],
    },
    onComplete: { action: "onComplete" },
    onChange: { action: "onChange" },
  },
} as ComponentMeta<typeof CodeVerifier>;
