import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { AutocompleteNew as Autocomplete, AutocompleteProps } from ".";
import { Field } from "@zendeskgarden/react-dropdowns.next";
import { Option } from "../option";
import { Label } from "../../label";
import { useEffect, useState } from "react";
import { ItemContent } from "../item-content";

let items = [
  { label: "Ferdinand ThreeMelons", value: "item-1", isSelected: true },
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

const TemplateCreatable: Story<AutocompleteProps> = (args) => {
  const [options, setOptions] = useState(items);
  const [matchingOptions, setMatchingOptions] = useState(options);

  useEffect(() => {
    setMatchingOptions(options);
  }, [options]);

  const filterOptions = (inputValue: string) => {
    if (inputValue === "") {
      setMatchingOptions(options);
      return;
    }
    const regex = new RegExp(inputValue, 'giu');
    setMatchingOptions(options.filter(item => item.label.match(regex)));
  }

  const onCreateNewOption = (inputValue: any) => {
    console.log("Creating new item", inputValue);
    console.log("opt", options);
    setOptions((prev) => {
      const newItem = { label: inputValue, value: `item-${prev.length + 1}`, isSelected: true };
      return [...prev.map(opt => args.isMultiselectable ? opt : { ...opt, isSelected: false }), newItem]
    });
    //alert("Creating new item: " + value.selectionValue);
  }

  return (
    <Field>
      <Label>Food Manager</Label>
      <Autocomplete {...args}
        isCreatable
        onInputChange={filterOptions}
        onCreateNewOption={onCreateNewOption}
        selectionValue={
          (args.isMultiselectable)
            ? options.filter(option => option.isSelected).map(option => option.value)
            : options.find(option => option.isSelected)?.value
        }
        onOptionClick={({ selectionValue }) => {
          if (!selectionValue) return;
          if (Array.isArray(selectionValue)) {
            setOptions((prev) => prev.map(option => ({ ...option, isSelected: selectionValue?.includes(option.value) })));
          } else {
            setOptions((prev) => prev.map(option => ({ ...option, isSelected: option.value === selectionValue })));
          }
          console.log("Option clicked", selectionValue);
        }}
      >
        {matchingOptions.length > 0
          ? matchingOptions.map(option => (
            <Option
              key={option.value}
              value={option.value}
              label={option.label + " value: " + option.value}
              isSelected={option.isSelected}
            />
          ))
          : <Option isDisabled value="" label="No results found" />
        }
      </Autocomplete>
    </Field>
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
  title: "Molecules/Dropdown/AutocompleteNew",
  component: Autocomplete,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Autocomplete>;
