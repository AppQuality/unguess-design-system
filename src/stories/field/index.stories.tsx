import { ComponentMeta, Story } from "@storybook/react";
import { Field } from ".";
import { FieldArgs } from "./_types";

const Template: Story<FieldArgs> = (args) => {
  return (
    <Field {...args}>
      <textarea value="Il componente Field contiene questa textarea" />
    </Field>
  );
};

export const Default = Template.bind({});
Default.args = {};

export default {
  title: "Atoms/Field",
  component: Field,
} as ComponentMeta<typeof Field>;
