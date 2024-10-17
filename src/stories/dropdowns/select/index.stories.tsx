import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { useState } from "react";
import { Select } from ".";
import { SelectArgs } from "./_types";

type ISingleItem = {
  label: string;
  value: string;
};

type IGroup = {
  label?: string;
  items: Array<ISingleItem>;
};

type IItem = ISingleItem | IGroup;

interface MenuStoryArgs extends SelectArgs {
  items: Array<IItem>;
  menuOption?: {
    label: string;
    onClick: () => void;
  };
}

const items = [
  { label: "Ferdinand ThreeMelons", value: "item-1" },
  { label: "Giommo Cornelio", value: "item-2" },
  { label: "Rubber tree", value: "item-3" },
];

const Template: Story<MenuStoryArgs> = ({ items, ...args }) => {
  function getSelectedValue() {
    if ("items" in items[0]) return items[0].items[0].value;
    return items[0].value;
  }
  const [selectedItem, setSelectedItem] = useState(getSelectedValue());
  function getItems() {
    return items.map((item) => {
      if ("items" in item) {
        return (
          <Select.OptionGroup label={item.label}>
            {item.items.map((singleItem) => (
              <Select.Option
                value={singleItem.value}
                label={singleItem.label}
              />
            ))}
          </Select.OptionGroup>
        );
      } else {
        return <Select.Option value={item.value} label={item.label} />;
      }
    });
  }
  function getItemByValue(value: string) {
    const allItems = items
      .map((item) => {
        if ("items" in item) {
          return item.items;
        }
        return item;
      })
      .flat();
    return allItems.find((item) => item.value === value);
  }
  return (
    <div style={{ width: "300px" }}>
      <Select
        {...args}
        inputValue={selectedItem}
        selectionValue={selectedItem}
        renderValue={(value) => getItemByValue(value.inputValue || "")?.label}
        onSelect={(value) => {
          setSelectedItem(value);
          args.onSelect?.(value);
        }}
        validation={args?.validation}
        label="Food Manager"
      >
        {getItems()}
        {args.menuOption && (
          <Select.MenuOption
            label={args.menuOption.label}
            value="menu-option"
            onClick={args.menuOption.onClick}
          />
        )}
      </Select>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: items,
  onSelect: (item: string) => {
    console.log(item);
    alert("Selected: " + item);
  },
  isCompact: false,
  isBare: false,
  isDisabled: false,
  isPrimary: false,
};

export const Validation = Template.bind({});
Validation.args = {
  items: items,
  onSelect: (item: string) => {
    console.log(item);
    alert("Selected: " + item);
  },
  isCompact: false,
  isBare: false,
  isDisabled: false,
  isPrimary: false,

  validation: "warning",
};

export const WithMenuOption = Template.bind({});
WithMenuOption.args = {
  items: items,
  onSelect: (item: string) => {
    console.log(item);
    alert("Selected: " + item);
  },
  isCompact: false,
  isBare: false,
  isDisabled: false,
  isPrimary: false,
  menuOption: {
    label: "Add new",
    onClick: () => {
      alert("Add new clicked");
    },
  },
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  items: [
    { label: "Giommis", items: items },
    { label: "Others", items: [{ label: "Non Giommis", value: "item-99" }] },
    { items: [{ label: "Ungrouped", value: "item-1000" }] },
  ],
  onSelect: (item: string) => {
    console.log(item);
    alert("Selected: " + item);
  },
  isCompact: false,
  isBare: false,
  isDisabled: false,
  isPrimary: false,
};

export default {
  title: "Molecules/Dropdown/Select",
  component: Select,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Select>;
