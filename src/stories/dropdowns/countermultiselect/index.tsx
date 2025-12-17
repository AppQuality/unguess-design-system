import { Combobox, Field, Label } from "@zendeskgarden/react-dropdowns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SelectOption } from "../../selectOption";
import { CounterMultiselectArgs } from "./_types";

const StyledComboBox = styled(Combobox)<{ isPrimary?: boolean }>`
  [data-garden-container-id="containers.combobox.option"] {
    display: flex;
    gap: ${({ theme }) => theme.space.sm};
    align-items: center;
  }

  ${(props) =>
    props.isPrimary &&
    `
    [data-garden-container-id="containers.combobox"] {
      background-color: ${props.theme.palette.blue[600]};
     color: white;
     svg[data-garden-id="dropdowns.combobox.input_icon"] {
        color: white;
     }
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
      <Field>
        {label ? <Label>{label}</Label> : null}
        <StyledComboBox
          isPrimary={hasSelectedItems}
          isAutocomplete
          isCompact={isCompact}
          inputValue={inputValue}
          renderExpandTags={() => ""}
          renderValue={() => {
            return hasSelectedItems
              ? i18n?.counterText
                ? i18n.counterText(selectedItems.length)
                : `Items (${selectedItems.length})`
              : i18n?.noItems ?? "No items";
          }}
          isMultiselectable
          onChange={({ type, selectionValue, inputValue }) => {
            if (
              ["input:keyDown:Enter", "option:click"].includes(type) &&
              selectionValue &&
              Array.isArray(selectionValue) &&
              onChange
            ) {
              const newOptions = options.filter((o) =>
                selectionValue.includes(o.itemId.toString())
              );
              onChange(newOptions);
              setSelectedItems(newOptions);
              setInputValue("");
            }
            if (type === "input:change") {
              setInputValue(inputValue || "");
            }
          }}
        >
          {options.map((option) => (
            <SelectOption
              key={option.itemId}
              value={option.itemId.toString()}
              label={option.label}
              tagProps={{
                hidden: true,
              }}
              isHidden={
                !matchingOptions.some(
                  (matchingOption) => matchingOption.itemId === option.itemId
                )
              }
              isSelected={selectedItems.some(
                (selectedItem) => selectedItem.itemId === option.itemId
              )}
            />
          ))}
          {matchingOptions.length === 0 && (
            <SelectOption
              isDisabled
              value=""
              label={i18n?.noMatches ?? "No matches found"}
            />
          )}
        </StyledComboBox>
      </Field>
      {/* <Dropdown
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
      </Dropdown> */}
    </>
  );
};

export { CounterMultiselect };
