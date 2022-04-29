import { ComponentMeta, Story } from "@storybook/react";
import { Autocomplete } from ".";
import { Item } from "../item";
import { Menu, Separator, MediaBody, MediaFigure } from "../menu";
import { Field } from "../field";
import { Dropdown } from "../select";
// import { Field } from "../../field";
import { Label } from "../../label";
import { AutocompleteArgs } from "./_types";
import { ReactComponent as AddIcon } from "../../../assets/icons/grid-add.svg";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

interface IItem {
  label: string;
  value: string;
}

interface AutocompleteStoryArgs extends AutocompleteArgs {
  allowNew?: boolean;
}

const items = [
  { label: "Ferdinand ThreeMelons", value: "item-1" },
  { label: "Giommo Cornelio", value: "item-2" },
  { label: "Rubber tree", value: "item-3" },
];

const Template: Story<AutocompleteStoryArgs> = (args) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(items);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);
  /**
   * Debounce filtering
   */
  const filterMatchingOptions = (value: string) => {
    console.log("debounce fired with value: ", value);
    const matchedOptions = items.filter(
      (item) =>
        item.label.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !==
        -1
    );

    console.log("matchedOptions: ", matchedOptions);
    setMatchingOptions(matchedOptions);
  };

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
  }, [debouncedInputValue]);

  console.log("Selected item: ", selectedItem);

  return (
    <Dropdown
      inputValue={inputValue}
      selectedItem={selectedItem}
      onSelect={(item: IItem) => {
        setInputValue("");
        setSelectedItem(item);
      }}
      onInputValueChange={(value) => {
        setInputValue(value);
      }}
      downshiftProps={{ itemToString: (item: IItem) => item && item.label }}
    >
      <Field>
        <Label>Food Manager</Label>
        <Autocomplete {...args}>{selectedItem.label}</Autocomplete>
      </Field>
      <Menu>
        {matchingOptions.length ? (
          matchingOptions.map((item) => (
            <Item key={item.value} value={item}>
              <span>{item.label}</span>
            </Item>
          ))
        ) : (
          <Item disabled><span>No matches found</span></Item>
        )}
        {args.allowNew && inputValue && (
          <>
            <Separator />
            <Item key="new" value={inputValue}>
              <MediaFigure>
                <AddIcon />
              </MediaFigure>
              <MediaBody>Add {inputValue}</MediaBody>
            </Item>
          </>
        )}
      </Menu>
      <Menu>
        {matchingOptions.length ? (
          matchingOptions.map((item) => (
            <Item key={item.value} value={item}>
              <span>{item.label}</span>
            </Item>
          ))
        ) : (
          <Item disabled>No matches found</Item>
        )}
      </Menu>
    </Dropdown>
  );
};

export const Default = Template.bind({});
Default.args = {
  allowNew: false,
};

export default {
  title: "Molecules/Dropdown/Autocomplete",
  component: Autocomplete,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Autocomplete>;
