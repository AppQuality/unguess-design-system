import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { AutocompleteNew as Autocomplete, AutocompleteProps } from ".";
import { Field } from "@zendeskgarden/react-dropdowns.next";
import { Option } from "../option";
import { Label } from "../../label";
import { useState } from "react";
import { ItemContent } from "../item-content";
import { on } from "events";

const items = [
  { label: "Ferdinand ThreeMelons", value: "item-1" },
  { label: "Giommo Cornelio", value: "item-2" },
  { label: "Rubber tree", value: "item-3" },
];

const Template: Story<AutocompleteProps> = (args) => {
  const [options, setOptions] = useState(items);

  const filterOptions = (inputValue: string) => {
    if (inputValue === "") {
      setOptions(items);
      return;
    }
    const regex = new RegExp(inputValue, 'giu');
    setOptions(items.filter(item => item.label.match(regex)));
  }

  return (
    <div style={{ width: "300px" }}>
        <Field>
        <Label>Food Manager</Label>
          <Autocomplete {...args} onInputChange={filterOptions}>
            {options.length > 0
              ? options.map(option => <Option key={option.value} value={option.value} />)
              : <Option isDisabled value="" label="No results found" />
            }
          </Autocomplete>
        </Field>
    </div>
  );
};

const itemsMedia = [
  {
    thumbSrc: "https://via.placeholder.com/60x40",
    label: "Ferdinand ThreeMelons",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    value: "item-1",
  },
  {
    thumbSrc: "https://via.placeholder.com/60x40",
    label: "Giommo Cornelio",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    value: "item-2",
  },
  {
    thumbSrc: "https://via.placeholder.com/40x60",
    label: "Rubber Tree",
    description: "Lorem ",
    value: "item-3",
  },
];

const TemplateWithItemMedia: Story<AutocompleteProps> = (args) => {
  return (
      <Field>
        <Label>Food Manager</Label>
        <Autocomplete isExpanded {...args}>
          {itemsMedia.map((item) => (
            <Option
              key={item.value}
              value={item.value}
            >
              <ItemContent {...item} />
            </Option>
          ))}
        </Autocomplete>
      </Field>
  );
};

export const Default = Template.bind({});
Default.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  }
};

export const Creatable = Template.bind({});
Creatable.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
    if (value.isNew) {
      alert("Creating new item: " + value.selectionValue);
    }
  },
  isCreatable: true,
};

export const WithMedia = TemplateWithItemMedia.bind({});
WithMedia.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  }
};

export default {
  title: "Molecules/Dropdown/AutocompleteNew",
  component: Autocomplete,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Autocomplete>;
