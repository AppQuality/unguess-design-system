import {
  Combobox,
  Field,
  Label,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { useEffect, useState } from "react";
import { ReactComponent as GridAddIcon } from "../../assets/icons/plus.svg";
import { Separator } from "../dropdowns/menu";
import { theme } from "../theme";
import { MultiSelectProps } from "./_types";

export const MultiSelectNew = ({
  options,
  onChange,
  creatable,
  i18n,
  maxItems,
  size,
  menuHeight,
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(options);
  useEffect(() => {
    const matchedOptions = options.filter(
      (option) =>
        option.label
          .trim()
          .toLowerCase()
          .indexOf(inputValue.trim().toLowerCase()) !== -1
    );

    setMatchingOptions(matchedOptions);
  }, [inputValue, options]);

  return (
    <Field>
      <Combobox
        renderValue={({ selection }) => {
          if (
            !selection ||
            (Array.isArray(selection) && selection.length === 0)
          ) {
            return (
              <div style={{ color: theme.palette.grey[400] }}>
                {i18n?.placeholder ?? "Select items..."}
              </div>
            );
          }
        }}
        renderExpandTags={
          i18n?.showMore
            ? (value) => {
                if (!i18n.showMore) return "";
                return i18n.showMore(value);
              }
            : undefined
        }
        maxHeight="auto"
        isCompact={size !== "medium"}
        isMultiselectable
        maxTags={maxItems}
        inputValue={inputValue}
        selectionValue={options.filter((option) => option.selected)}
        listboxMaxHeight={menuHeight ?? "200px"}
        isAutocomplete
        onChange={({ type, inputValue, selectionValue }) => {
          if (type === "input:change") {
            setInputValue(inputValue || "");
            return;
          }
          if (
            onChange &&
            (type === "fn:setSelectionValue" || type === "option:click") &&
            Array.isArray(selectionValue)
          ) {
            const selectedOptions = selectionValue.filter((v) => v.id);
            const newOption = selectionValue.find((v) => !v.id);
            onChange(
              options.map((o) => ({
                ...o,
                selected: selectedOptions.some((i) => i.id === o.id),
              })),
              newOption ? newOption : undefined
            ).then(() => setInputValue(""));
          }
        }}
      >
        <Label hidden>{i18n?.label ?? "Multiselect"}</Label>
        {matchingOptions.map((option) => (
          <Option
            key={option.id}
            value={option}
            label={option.label}
            isSelected={option.selected}
            tagProps={{ isPill: true, children: option.label }}
          />
        ))}
        {matchingOptions.length === 0 && !creatable && (
          <Option
            isDisabled
            value=""
            label={i18n?.noMatches ?? "No matches found"}
          />
        )}
        {creatable &&
        inputValue.length > 0 &&
        !matchingOptions.find(
          (item) => item.label.toLowerCase() === inputValue.toLowerCase()
        ) ? (
          <>
            <Separator />
            <Option
              tagProps={{ isPill: true }}
              value={inputValue}
              icon={<GridAddIcon />}
              label={
                i18n?.addNew
                  ? i18n.addNew(inputValue)
                  : `Want to add "${inputValue}"?`
              }
            />
          </>
        ) : null}
      </Combobox>
    </Field>
  );
};
