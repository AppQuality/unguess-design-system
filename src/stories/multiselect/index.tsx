import { Field, Label } from "@zendeskgarden/react-dropdowns.next";
import { useEffect, useState } from "react";
import { ReactComponent as GridAddIcon } from "../../assets/icons/plus.svg";
import { Combobox } from "../combobox";
import { Separator } from "../dropdowns/menu";
import { SelectOption } from "../selectOption";
import { theme } from "../theme";
import { MultiSelectProps } from "./_types";

export const MultiSelect = ({
  options,
  onChange,
  creatable,
  isEditable,
  i18n,
  maxItems,
  size,
  menuHeight,
  listboxAppendToNode,
  disabled,
  onBlur,
  ...props
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
      <Label hidden>{i18n?.label ?? "Multiselect"}</Label>
      <Combobox
        {...props}
        onBlur={onBlur}
        isDisabled={disabled}
        isEditable={isEditable}
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
        listboxAppendToNode={listboxAppendToNode}
        maxHeight="auto"
        isCompact={size !== "medium"}
        isMultiselectable
        maxTags={maxItems}
        inputValue={inputValue}
        selectionValue={options
          .filter((option) => option.selected)
          .map((o) => o.id.toString())}
        listboxMaxHeight={menuHeight ?? "200px"}
        isAutocomplete
        onChange={({ type, inputValue: newInput, selectionValue }) => {
          if (disabled) return; // blocca interazioni se disabilitato

          if (type === "input:change") {
            setInputValue(newInput || "");
            return;
          }

          if (
            onChange &&
            (type === "fn:setSelectionValue" ||
              type === "option:click" ||
              type === "input:keyDown:Enter") &&
            Array.isArray(selectionValue)
          ) {
            const ss = selectionValue.map((s) => {
              const option = options.find((o) => o.id === parseInt(s));
              if (!option) {
                return {
                  id: undefined,
                  label: s,
                  selected: true,
                };
              }
              return {
                ...option,
                selected: true,
              };
            });

            const selectedOptions = ss.filter((v) => v.id);
            const newOption = ss.find((v) => !v.id)?.label;

            const result = onChange(
              options.map((o) => ({
                ...o,
                selected: selectedOptions.some((i) => i.id === o.id),
              })),
              newOption ? newOption : undefined
            );
            if (result && typeof result.then === "function") {
              result.then(() => setInputValue(""));
            } else {
              setInputValue("");
            }
          }
        }}
      >
        {options.map((option) => (
          <SelectOption
            {...option}
            id={option.id?.toString() || option.label}
            isHidden={!matchingOptions.some((o) => o.id === option.id)}
            key={option.id}
            value={option.id.toString()}
            label={option.label}
            isSelected={option.selected}
            tagProps={{
              isPill: true,
            }}
          />
        ))}

        {matchingOptions.length === 0 && !creatable && (
          <SelectOption
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
            <SelectOption
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
