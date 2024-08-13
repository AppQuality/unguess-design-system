import { Meta, StoryFn } from "@storybook/react";
import { Checkbox } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { CheckboxArgs } from "./_types";

const Template: StoryFn<CheckboxArgs> = (args) => {
  return (
    <Field>
      <Checkbox {...args}>
        <Label isRegular={true}>Questa è una Label accanto la Checkbox</Label>
      </Checkbox>
    </Field>
  );
};

export const Default = Template.bind({});
Default.args = {
  indeterminate: false,
  disabled: false,
  defaultChecked: true,
};

export default {
  title: "Molecules/Forms/Checkbox",
  component: Checkbox,
} as Meta<typeof Checkbox>;
