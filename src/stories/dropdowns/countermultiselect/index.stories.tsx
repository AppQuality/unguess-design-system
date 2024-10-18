import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { CounterMultiselect } from ".";
import { CounterMultiselectArgs } from "./_types";

const options = [
  {
    itemId: "asp",
    label: "Asparagus long text to test if dropdown menu works correctly",
    selected: true,
  },
  { itemId: "caul", label: "Cauliflower", selected: true },
  { itemId: 3, label: "Garlic" },
  { itemId: 4, label: "Kale" },
  { itemId: 5, label: "Onion" },
  { itemId: 6, label: "Mushroom" },
  { itemId: 7, label: "Potato" },
];

const Template: Story<CounterMultiselectArgs> = ({ ...args }) => (
  <div style={{ width: "300px" }}>
    <CounterMultiselect {...args} />
  </div>
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
