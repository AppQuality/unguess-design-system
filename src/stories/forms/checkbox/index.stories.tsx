import { ComponentMeta, Story } from "@storybook/react";
import { Checkbox, Field, Label } from ".";
import { CheckboxArgs, FieldArgs, LabelArgs } from "./_types";

const Template: Story<CheckboxArgs> = (args) => {
  return (
    <Field>
      <Checkbox {...args}>
        <Label isRegular={true}>Questa è una checkbox</Label>
      </Checkbox>
    </Field>
  )
}

export const Basic = Template.bind({});
Basic.args = {
  onClick: () => alert("clicked!"),
};

export default {
  title: "Atoms/Forms/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;
