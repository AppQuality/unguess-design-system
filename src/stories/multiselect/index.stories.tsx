import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { useState } from "react";
import { MultiSelect } from ".";
import { MultiSelectProps } from "./_types";

const Template: Story<MultiSelectProps> = (args) => {
  return (
    <div style={{ width: "300px" }}>
      <MultiSelect {...args} />
    </div>
  );
};

const options = [
  {
    id: 1,
    label: "Asparagus",
    selected: true,
  },
  { id: 2, label: "Cauliflower", selected: true },
  { id: 3, label: "Garlic", selected: true },
  { id: 4, label: "Kale" },
  { id: 5, label: "Onion" },
  { id: 6, label: "Mushroom" },
  { id: 7, label: "Potato" },
];

export const Default = Template.bind({});
Default.args = {
  options: options,
  onChange: async (selectedItems) => {
    console.log(
      "selectedItems",
      selectedItems.filter((o) => o.selected)
    );
    await patchMock(selectedItems);
  },
};

const patchMock = async (
  options: { id?: number; label: string }[]
): Promise<{ id: number; label: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOptions = options.map((option) => ({
        id: option.id ? option.id : Math.floor(Math.random() * 100),
        label: option.label,
      }));
      console.log("options", options);
      console.log(
        "newOptions",
        newOptions.filter((o) => !options.find((op) => op.id === o.id))
      );
      resolve(newOptions);
    }, 1000);
  });
};

const WithTagCreationTemplate: Story<MultiSelectProps> = (args) => {
  const [items, setItems] = useState(options);
  return (
    <div style={{ width: "300px" }}>
      <MultiSelect
        {...args}
        options={items}
        onChange={async (items, newLabel) => {
          const result = await patchMock([
            ...items.filter((o) => o.selected),
            ...(newLabel ? [{ label: newLabel }] : []),
          ]);
          const unselectedItems = options.filter(
            (o) => !result.find((r) => r.id === o.id)
          );

          setItems([
            ...unselectedItems.map((r) => ({ ...r, selected: false })),
            ...result.map((r) => ({ ...r, selected: true })),
          ]);
          console.log("result", result);
          console.log("selectedItems");
          console.log("newLabel", newLabel);
        }}
      />
    </div>
  );
};

export const WithTagCreation = WithTagCreationTemplate.bind({});
WithTagCreation.args = {
  options,
  creatable: true,
};

export const Disabled = WithTagCreationTemplate.bind({});
Disabled.args = {
  options,
  disabled: true,
};

export default {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;
