import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Multiselect,
  Field,
  Menu,
  Item,
  Label,
  IItemProps,
} from "@zendeskgarden/react-dropdowns";
import { Tag } from "@zendeskgarden/react-tags";
import { MultiSelectProps } from "./_types";

const CustomItem: React.ForwardRefExoticComponent<
  IItemProps & { addable?: boolean } & React.RefAttributes<HTMLLIElement>
> = Item;

const AddableItem = (props: IItemProps) => (
  <CustomItem {...props} addable disabled />
);

export const MultiSelect = ({
  options,
  selectedItems,
  onChange,
  onCreate,
}: MultiSelectProps) => {
  const [currentOptions, setCurrentOptions] = useState(options);
  const [currentSelectedItems, setSelectedItems] = useState(
    selectedItems || []
  );
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(options);

  useEffect(() => {
    const matchedOptions = currentOptions.filter((option) => {
      return (
        option.label
          .trim()
          .toLowerCase()
          .indexOf(inputValue.trim().toLowerCase()) !== -1
      );
    });

    setMatchingOptions(matchedOptions);
  }, [inputValue]);

  const renderOptions = () => {
    if (matchingOptions.length === 0) {
      return (
        <>
          <Item disabled>No matches found</Item>
          {onCreate ? (
            <AddableItem
              onClick={async () => {
                if (onCreate) {
                  const newOption = await onCreate(inputValue);
                  const newSelectedItems = [...currentSelectedItems, newOption];
                  setMatchingOptions([...matchingOptions, newOption]);
                  setSelectedItems(newSelectedItems);
                  setCurrentOptions([...currentOptions, newOption]);
                  setInputValue("");
                  onChange && onChange(newSelectedItems);
                }
              }}
            >
              Want to add {inputValue}?
            </AddableItem>
          ) : null}
        </>
      );
    }

    return matchingOptions.map((option) => (
      <Item key={`${option.label}-${option.id}`} value={option}>
        <span>{option.label}</span>
      </Item>
    ));
  };

  return (
    <Dropdown
      inputValue={inputValue}
      selectedItems={currentSelectedItems}
      onSelect={(items) => {
        setSelectedItems(items);
        onChange && onChange(items);
      }}
      downshiftProps={{ itemToString: (item: any) => (item ? item.id : "") }}
      onInputValueChange={(value) => setInputValue(value)}
    >
      <Field>
        <Label hidden>Accessibly hidden label</Label>
        <Multiselect
          renderItem={({ value }) => (
            <Tag>
              <span>{value.label}</span>
              <Tag.Close
                onClick={() => {
                  setSelectedItems(
                    currentSelectedItems.filter((item) => item.id !== value.id)
                  );
                }}
              />
            </Tag>
          )}
        />
      </Field>
      <Menu>{renderOptions()}</Menu>
    </Dropdown>
  );
};
