import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Dropdown, Message, Select } from ".";
import { DropdownField as Field } from "../field";
import { Item } from "../item";
import { Menu } from "../menu";
// import { Field } from "../../field";
import { Label } from "../../label";
import { MenuArgs } from "../menu/_types";
import { DropdownArgs, SelectArgs } from "./_types";

interface IItem {
  label: string;
  value: string;
}

interface MenuStoryArgs {
  dropdown: DropdownArgs;
  menu: MenuArgs;
  items: Array<IItem>;
  select: SelectArgs;
  validation?: "success" | "warning" | "error";
  hasHelpText?: boolean;
}

const items = [
  { label: "Ferdinand ThreeMelons", value: "item-1" },
  { label: "Giommo Cornelio", value: "item-2" },
  { label: "Rubber tree", value: "item-3" },
];

const Template: Story<MenuStoryArgs> = ({
  items,
  menu,
  select,
  dropdown,
  ...args
}) => {
  return (
    <div style={{ width: "300px" }}>
      <Dropdown {...dropdown}>
        <Field>
          <Label>Food Manager</Label>
          <Select {...select} validation={args?.validation}>
            {items[0].label}
          </Select>
          {args?.hasHelpText && (
            <Message validation={args.validation}>
              Validation message will apppear here
            </Message>
          )}
        </Field>
        <Menu {...menu}>
          {items.map((item) => (
            <Item value={item.value}>{item.label}</Item>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: items,
  dropdown: {
    selectedItem: items[0],
    onSelect: (item: IItem) => {
      console.log(item);
      alert("Selected: " + item);
    },
  },
  select: {
    isCompact: false,
    isBare: false,
    disabled: false,
    isPrimary: false,
  },
};

export const Validation = Template.bind({});
Validation.args = {
  items: items,
  dropdown: {
    selectedItem: items[0],
    onSelect: (item: IItem) => {
      console.log(item);
      alert("Selected: " + item);
    },
  },
  menu: {},
  validation: "warning",
  hasHelpText: false,
  select: {
    isCompact: false,
    isBare: false,
    disabled: false,
  },
};

export default {
  title: "Molecules/Dropdown/Select",
  component: Dropdown,
  argTypes: {
    selectedItem: {
      table: {
        disable: true,
      },
    },
    selectedItems: {
      table: {
        disable: true,
      },
    },
    dropdown: {
      table: {
        disable: true,
      },
    },
    items: {
      table: {
        disable: true,
      },
    },
    validation: {
      control: {
        type: "select",
        options: ["success", "warning", "error"],
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Dropdown>;
