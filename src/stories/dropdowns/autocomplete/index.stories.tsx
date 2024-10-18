import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Autocomplete, AutocompleteProps } from ".";
import { Field } from "@zendeskgarden/react-dropdowns.next";
import { Label } from "../../label";
import { useState } from "react";
import { fn } from '@storybook/test';
import { ItemContent } from "../item-content";

let items = [
  { label: "Ferdinand ThreeMelons", value: "item-1", id: "item-1", isSelected: true },
  { label: "Giommo Cornelio", value: "item-2", id: "item-2" },
  { label: "Rubber tree", value: "item-3", id: "item-3" },
];

const Template: Story<AutocompleteProps> = (args) => {

  return (
    <div style={{ width: "300px" }}>
      <Field>
        <Label>Food Manager</Label>
        <Autocomplete
          {...args}
          options={items}
        />
      </Field>
    </div>
  );
};

const TemplateCreatable: Story<AutocompleteProps> = (args) => {
  return (
    <Field>
      <Label>Food Manager</Label>
      <Autocomplete {...args}
        options={items}
        isCreatable
        onCreateNewOption={async (inputValue) => {
          // mock a promise to create a new item
          return await new Promise((resolve) => setTimeout(() => {
            if (inputValue === "invalid") {
              alert("Invalid value");
              resolve(false);
            } else {
              resolve({ label: inputValue, value: inputValue, id: inputValue });
            }
          }, 1000));
        }}
        onOptionClick={({ selectionValue }) => {
          console.log("Option clicked", selectionValue);
        }}
      />
    </Field>
  );
};

const itemsMedia = [
  {
    label: "Ferdinand ThreeMelons",
    value: "item-1",
    id: "item-1",
    children: (
      <ItemContent
        label="Ferdinand ThreeMelons"
        thumbSrc="https://via.placeholder.com/60x40"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
    ),
  },
  {
    label: "Giommo Cornelio",
    value: "item-2",
    id: "item-2",
    children: (
      <ItemContent
        label="Giommo Cornelio"
        thumbSrc="https://via.placeholder.com/60x40"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
    ),
  },
  {
    label: "Rubber Tree",
    value: "item-3",
    id: "item-3",
    children: (
      <ItemContent
        label="Rubber Tree"
        thumbSrc="https://via.placeholder.com/40x60"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
    ),
  },
];

const TemplateWithItemMedia: Story<AutocompleteProps> = (args) => {
  return (
    <Field>
      <Label>Food Manager</Label>
      <Autocomplete {...args} options={itemsMedia} isExpanded />
    </Field>
  );
};

export const Default = Template.bind({});
Default.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  }
};

export const Creatable = TemplateCreatable.bind({});
Creatable.args = {
  isMultiselectable: true,
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  }
};

export const WithMedia = TemplateWithItemMedia.bind({});
WithMedia.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  }
};

export default {
  title: "Molecules/Dropdown/Autocomplete",
  component: Autocomplete,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  args: {
    onChange: fn()
  },
} as ComponentMeta<typeof Autocomplete>;
