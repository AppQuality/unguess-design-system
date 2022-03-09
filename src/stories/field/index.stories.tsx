import { ComponentMeta, Story } from "@storybook/react";
import { Field } from ".";
import { FieldArgs } from "./_types";

const Template: Story<FieldArgs> = (args) => {
  return (
    <Field>
      <textarea value="Il componente Field contiene questa textarea" />
    </Field>
  )
}

export const Basic = Template.bind({});
Basic.args = {
  
};

export default {
  title: "Atoms/Forms/Field",
  component: Field,
} as ComponentMeta<typeof Field>;
