import { useEffect, useState } from "react";
import styled from "styled-components";
import { Label } from "../../label";
import { theme } from "../../theme";
import { getColor } from "../../theme/utils";
import { Autocomplete } from "../autocomplete";
import { DropdownField as Field } from "../field";
import { Item } from "../item";
import { Menu } from "../menu";
import { Dropdown } from "../select";
import { CounterMultiselectArgs } from "./_types";

const StyledAutocomplete = styled(Autocomplete)<{
  hasSelectedItems: boolean;
  theme: typeof theme;
}>`
  ${(props) =>
    props.hasSelectedItems &&
    `
    border-color: ${getColor(theme.colors.primaryHue, 600)};
    background-color: ${getColor(theme.colors.primaryHue, 600)};
    color: white;
    & > input, & > svg {
      color: ${props.theme.palette.white};
    }
  `}
`;

const CounterMultiselect = ({
  options,
  label,
  i18n,
  onChange,
  isCompact,
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

  useEffect(() => {
    setSelectedItems(options.filter((o) => o.selected));
  }, [options]);

  const hasSelectedItems = selectedItems.length > 0;

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
            item && item.itemId,
        }}
        onStateChange={(changes) => {
          if (changes.isOpen === false) setInputValue("");
        }}
        onInputValueChange={(value) => setInputValue(value)}
      >
        <Field>
          {label && <Label>{label}</Label>}
          <StyledAutocomplete
            isCompact={isCompact}
            hasSelectedItems={hasSelectedItems}
          >
            {hasSelectedItems
              ? i18n?.counterText
                ? i18n.counterText(selectedItems.length)
                : `Items (${selectedItems.length})`
              : i18n?.noItems ?? "No items"}
          </StyledAutocomplete>
        </Field>
        <Menu isCompact={isCompact}>
          {matchingOptions.length === 0 ? (
            <Item disabled>{i18n?.noMatches ?? "No matches found"}</Item>
          ) : (
            matchingOptions.map((option) => (
              <Item key={option.itemId} value={option} {...option}>
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
