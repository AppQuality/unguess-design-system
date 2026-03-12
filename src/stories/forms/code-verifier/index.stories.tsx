import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { useRef, useState } from "react";
import { CodeVerifier } from ".";
import { CodeVerifierArgs, CodeVerifierRef } from "./_types";

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

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  ...defaultArgs,
  autoFocus: true,
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

export const Controlled: Story<CodeVerifierArgs> = (args) => {
  const [value, setValue] = useState("123456");
  return (
    <div>
      <CodeVerifier {...args} value={value} onChange={setValue} />
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={() => setValue("")}>
          Clear externally
        </button>
        <button type="button" onClick={() => setValue("654321")} style={{ marginLeft: 8 }}>
          Set to 654321
        </button>
        <p style={{ marginTop: 8 }}>Current value: &quot;{value}&quot;</p>
      </div>
    </div>
  );
};
Controlled.args = {
  ...defaultArgs,
};

export const WithImperativeReset: Story<CodeVerifierArgs> = (args) => {
  const ref = useRef<CodeVerifierRef>(null);
  return (
    <div>
      <CodeVerifier {...args} ref={ref} />
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={() => ref.current?.reset()}>
          Reset
        </button>
        <button type="button" onClick={() => ref.current?.focus()} style={{ marginLeft: 8 }}>
          Focus
        </button>
      </div>
    </div>
  );
};
WithImperativeReset.args = {
  ...defaultArgs,
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
    autoFocus: {
      control: "boolean",
    },
    onComplete: { action: "onComplete" },
    onChange: { action: "onChange" },
  },
} as ComponentMeta<typeof CodeVerifier>;
