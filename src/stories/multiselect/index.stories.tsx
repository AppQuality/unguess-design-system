import { ComponentMeta, Story } from "@storybook/react";
import { MultiSelect } from ".";
import { MultiSelectProps } from "./_types";

const Template: Story<MultiSelectProps> = (args) => {
  return <MultiSelect {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: 1, label: "Asparagus" },
    { id: 2, label: "Cauliflower" },
    { id: 3, label: "Garlic" },
    { id: 4, label: "Kale" },
    { id: 5, label: "Onion" },
    { id: 6, label: "Mushroom" },
    { id: 7, label: "Potato" },
  ],
  selectedItems: [
    { id: 1, label: "Asparagus" },
    { id: 2, label: "Cauliflower" },
  ],
  onChange: (selectedItems) => {
    console.log("selectedItems", selectedItems);
  },
  onCreate: undefined,
};

export const WithTagCreation = Template.bind({});
WithTagCreation.args = {
  options: [
    { id: 1, label: "Asparagus" },
    { id: 2, label: "Cauliflower" },
    { id: 3, label: "Garlic" },
    { id: 4, label: "Kale" },
    { id: 5, label: "Onion" },
    { id: 6, label: "Mushroom" },
    { id: 7, label: "Potato" },
  ],
  selectedItems: [
    { id: 1, label: "Asparagus" },
    { id: 2, label: "Cauliflower" },
  ],
  onChange: (selectedItems) => {
    console.log("selectedItems", selectedItems);
  },
  onCreate: (newLabel) => {
    console.log("newLabel", newLabel);
    return Promise.resolve({
      id: Math.floor(Math.random() * 100),
      label: newLabel,
    });
  },
};

export default {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;
