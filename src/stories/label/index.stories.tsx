import { ComponentMeta, Story } from "@storybook/react";
import { Label } from ".";
import { LabelArgs } from "./_types";

const Template: Story<LabelArgs> = (args) => {
  return (
    <Label {...args}>Questa è una Label</Label>
  )
}

export const Basic = Template.bind({});
Basic.args = {
  isRegular: true
};

export const Bold = Template.bind({});
Bold.args = {
  isRegular: false
};

export default {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Label>;
