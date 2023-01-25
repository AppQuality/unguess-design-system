import { ComponentMeta, Story } from "@storybook/react";
import { CounterMultiselect } from ".";
import { CounterMultiselectArgs } from "./_types";

const options = [
  { id: "asp", label: "Asparagus", selected: true },
  { id: "caul", label: "Cauliflower", selected: true },
  { id: 3, label: "Garlic" },
  { id: 4, label: "Kale" },
  { id: 5, label: "Onion" },
  { id: 6, label: "Mushroom" },
  { id: 7, label: "Potato" },
];

const Template: Story<CounterMultiselectArgs> = ({ ...args }) => (
  <CounterMultiselect {...args} />
);
export const Default = Template.bind({});
Default.args = {
  options,
  onChange: (selectedItems) => console.log(selectedItems),
};

export default {
  title: "Molecules/Dropdown/Multiselect With Counter",
  component: CounterMultiselect,
} as ComponentMeta<typeof CounterMultiselect>;
