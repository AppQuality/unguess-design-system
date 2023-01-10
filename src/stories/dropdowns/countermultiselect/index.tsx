import {
  Autocomplete,
  Dropdown,
  Field,
  Item,
  Label,
  Menu,
} from "@zendeskgarden/react-dropdowns";
import { useEffect, useState } from "react";
import { CounterMultiselectArgs } from "./_types";

const CounterMultiselect = ({
  options,
  label,
  i18n,
  onChange,
}: CounterMultiselectArgs) => {
  const [selectedItems, setSelectedItems] = useState(
    options.filter((o) => o.selected)
  );
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(options);

  useEffect(() => {
    setMatchingOptions(
      options.filter(
        (option) =>
          option.label
            .trim()
            .toLowerCase()
            .indexOf(inputValue.trim().toLowerCase()) !== -1
      )
    );
  }, [inputValue, options]);

  return (
    <>
      <Dropdown
        inputValue={inputValue}
        selectedItems={selectedItems}
        onSelect={(items) => {
          if (items) {
            setSelectedItems(items);
            if (onChange) onChange(items);
          }
        }}
        downshiftProps={{
          itemToString: (item: CounterMultiselectArgs["options"][number]) =>
            item && item.id,
        }}
        onInputValueChange={(value) => setInputValue(value)}
      >
        <Field>
          {label && <Label>{label}</Label>}
          <Autocomplete>
            {selectedItems.length
              ? i18n?.counterText
                ? i18n.counterText(selectedItems.length)
                : `Items (${selectedItems.length})`
              : i18n?.noItems ?? "No items"}
          </Autocomplete>
        </Field>
        <Menu>
          {matchingOptions.length === 0 ? (
            <Item disabled>{i18n?.noMatches ?? "No matches found"}</Item>
          ) : (
            matchingOptions.map((option) => (
              <Item key={option.id} value={option}>
                <span>{option.label}</span>
              </Item>
            ))
          )}
        </Menu>
      </Dropdown>
    </>
  );
};

export { CounterMultiselect };
