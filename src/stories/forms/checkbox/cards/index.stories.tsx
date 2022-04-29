import { ComponentMeta, Story } from "@storybook/react";
import { CheckboxCard } from ".";
import { CheckboxCardArgs } from "./_types";
import { Field } from "../../field";
import { ReactComponent as SmartphoneIcon } from "../../../../assets/icons/smartphone.svg";
import { ReactComponent as SmartphoneActiveIcon } from "../../../../assets/icons/smartphone-active.svg";

const Template: Story<CheckboxCardArgs> = (args) => {
  return (
    <Field>
      <CheckboxCard {...args} name={"platform"} value={1} icon={<SmartphoneIcon/>} iconActive={<SmartphoneActiveIcon/>}></CheckboxCard>
    </Field>
  )
}

export const Default = Template.bind({});
Default.args = {
  indeterminate: false,
  disabled: false,
  defaultChecked: true,
  card: {
    isFloating: false
  },
  label: "Smartphone",
};

export default {
  title: "Molecules/Forms/CheckboxCard",
  component: CheckboxCard
} as ComponentMeta<typeof CheckboxCard>;
