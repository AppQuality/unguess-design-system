import { ComponentMeta, Story } from "@storybook/react";
import { MultiSelect } from ".";
import { MultiSelectProps } from "./_types";

const Template: Story<MultiSelectProps> = (args) => {
  return <MultiSelect {...args} />;
};

const options = [
  { id: 1, label: "Asparagus" },
  { id: 2, label: "Cauliflower" },
  { id: 3, label: "Garlic" },
  { id: 4, label: "Kale" },
  { id: 5, label: "Onion" },
  { id: 6, label: "Mushroom" },
  { id: 7, label: "Potato" },
];

export const Default = Template.bind({});
Default.args = {
  options: options,
  selectedItems: [options[0], options[1]],
  onChange: async (selectedItems) => {
    console.log("selectedItems", selectedItems);
    return await patchMock(selectedItems);
  },
};

const patchMock = async (
  options: { id?: number | string; label: string }[]
): Promise<{ id: number | string; label: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOptions = options.map((option) => ({
        id: option.id ? option.id : Math.floor(Math.random() * 100),
        label: option.label,
      }));
      console.log("options", options);
      console.log("newOptions", newOptions);
      resolve(newOptions);
    }, 1000);
  });
};

export const WithTagCreation = Template.bind({});
WithTagCreation.args = {
  options,
  selectedItems: [options[0], options[1]],
  creatable: true,
  onChange: async (selectedItems, newLabel) => {
    if (newLabel) {
      const result = await patchMock([...selectedItems, { label: newLabel }]);
      return Promise.resolve(result);
    }
    return Promise.resolve(await patchMock(selectedItems));
  },
};

export default {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;
