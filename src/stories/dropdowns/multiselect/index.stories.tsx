import { ComponentMeta, Story } from "@storybook/react";
import { Multiselect } from ".";
import { Dropdown, Message } from "../select";
import { Item } from "../item";
import { Menu } from "../menu";
import { Field } from "../field";
// import { Field } from "../../field";
import { Label } from "../../label";
import { MultiselectArgs } from "./_types";
import { Tag } from "@zendeskgarden/react-tags"; //TODO: replace with unguess component
import { MenuArgs } from "../../menu/_types";
import { DropdownArgs } from "../select/_types";

interface IItem {
  label: string;
  value: string;
}

interface MenuStoryArgs {
  dropdown: DropdownArgs;
  menu: MenuArgs;
  items: Array<IItem>;
  select: MultiselectArgs;
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
  const props = { ...args } as MenuStoryArgs;
  props.select = select;
  props.menu = menu;
  props.dropdown = dropdown;

  console.log("Props:", props);
  return (
    <Dropdown {...props.dropdown}>
      <Field>
        <Label>Food Manager</Label>
        <Multiselect {...select} />

        {args?.hasHelpText && (
          <Message validation={args.validation}>
            Validation message will apppear here
          </Message>
        )}
      </Field>
      <Menu {...props.menu}>
        {items.map((item) => (
          <Item key={item.value} value={item.value}>{item.label}</Item>
        ))}
      </Menu>
    </Dropdown>
  );
};

const defaultArgs: MenuStoryArgs = {
  items: items,
  dropdown: {
    selectedItems: [items[0], items[1]],
    downshiftProps:{itemToString: (item: IItem) => item && item.label },
    onSelect: (item: IItem) => {
      console.log(item);
      alert("Selected: " + item);
    },
  },
  menu: {},
  select: {
    isCompact: false,
    isBare: false,
    disabled: false,
    renderItem: ({value, removeValue}: any) => {
      console.log("renderItem:", value);
      return (
        <Tag>
          <span>{value.label}</span>
          <Tag.Close onClick={() => alert('Clicked!')} />
        </Tag>
      );
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Validation = Template.bind({});
Validation.args = {
  ...defaultArgs,
  validation: "warning",
  hasHelpText: false,
};

export default {
  title: "Molecules/Dropdown/Multiselect",
  component: Multiselect,
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
} as ComponentMeta<typeof Multiselect>;
