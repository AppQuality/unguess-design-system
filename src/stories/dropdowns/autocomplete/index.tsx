import { OptionValue } from "@zendeskgarden/react-dropdowns";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { Combobox, ComboboxProps } from "../../combobox";
import { IOptGroup, IOption, SelectOption } from "../../selectOption";
import { OptGroup } from "../optGroup";

export interface OnOptionClickArgs {
  inputValue?: string;
  selectionValue?: OptionValue | OptionValue[] | null;
}

export interface AutocompleteProps extends ComboboxProps {
  onOptionClick?: ({ inputValue, selectionValue }: OnOptionClickArgs) => void;
  onInputChange?: (inputValue: string) => void;
  isCreatable?: boolean;
  onCreateNewOption?: (inputValue: string) => Promise<IOption | false>;
  options: Array<IOptGroup | IOption>;
}

// flat the options array that can have nested options
function flatOptions(options: AutocompleteProps["options"]) {
  return options.reduce<IOption[]>((acc, option) => {
    if ("options" in option) {
      return [...acc, ...option.options];
    }
    return [...acc, option];
  }, []);
}

// utility function to check visibility based on the input value in the input field
function isHidden(option: IOption, inputValue?: string) {
  if (!inputValue) return false;
  const regex = new RegExp(inputValue, "giu");
  return !option.label?.match(regex);
}

/**
 * Autocomplete is an input field that filters results as users type. This helps users find something quickly in a large list of options.
 * <hr>
 * Used for this:
    - To filter down a large list of options
    - To quickly find a known option
 * Not for this:
    - To make more than one selection, use Multiselect instead
 */
const Autocomplete = ({
  options,
  onOptionClick,
  onInputChange,
  onChange,
  isCreatable,
  isEditable,
  onCreateNewOption,
  isMultiselectable,
  ...props
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [_options, setOption] = useState(options);
  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => setOption(options), [options]);

  // update options isHidden property based on inputValue
  const matchingOptions = useMemo(
    () =>
      _options.map((opt) => {
        if ("options" in opt) {
          return {
            ...opt,
            options: opt.options.map((o) => ({
              ...o,
              isHidden: isHidden(o, debouncedInputValue),
            })),
          };
        }
        return {
          ...opt,
          isHidden: isHidden(opt, debouncedInputValue),
        };
      }),
    [_options, debouncedInputValue]
  );

  // check if there are visible options
  const thereAreVisibleOptions = useMemo(
    () => flatOptions(matchingOptions).some((opt) => opt.isHidden !== true),
    [matchingOptions]
  );

  const handleChange = useCallback<NonNullable<ComboboxProps["onChange"]>>(
    (event) => {
      if (typeof onChange === "function") {
        onChange(event);
      }

      if (event.type === "input:change" && event.inputValue !== undefined) {
        const sanitizedInputValue = event.inputValue.replace(
          /[.*+?^${}()|[\]\\]/giu,
          "\\$&"
        );
        setInputValue(sanitizedInputValue);
        if (typeof onInputChange === "function")
          onInputChange(sanitizedInputValue);
      }
      if (
        (event.type === "option:click" ||
          event.type === "input:keyDown:Enter") &&
        typeof onOptionClick === "function" &&
        event.selectionValue // address the issue of clicking enter on an empty input
      ) {
        setInputValue(undefined);
        onOptionClick({
          inputValue: event.inputValue,
          selectionValue: event.selectionValue,
        });
      }
    },
    []
  );

  return (
    <Combobox
      {...props}
      isAutocomplete
      isEditable={isEditable}
      onChange={handleChange}
    >
      {matchingOptions.map((option, index) => {
        if ("options" in option) {
          return (
            <OptGroup key={option.id} {...option}>
              {option.options.map((opt) => (
                <SelectOption key={opt.id} {...opt} />
              ))}
            </OptGroup>
          );
        }
        return <SelectOption key={index} {...option} />;
      })}
      {!thereAreVisibleOptions && (
        <SelectOption
          id="no-results"
          label="No results found"
          value=""
          isDisabled
        >
          No results found
        </SelectOption>
      )}
      {isCreatable &&
        debouncedInputValue &&
        !matchingOptions.find(
          (item) =>
            "label" in item &&
            item.label?.toLowerCase() === debouncedInputValue.toLowerCase()
        ) && (
          <SelectOption
            id="create-new-option"
            label={debouncedInputValue}
            type="add"
            value={debouncedInputValue}
            title={debouncedInputValue}
            onClickCapture={async (e) => {
              if (typeof onCreateNewOption === "function") {
                const newOption = await onCreateNewOption(
                  e.currentTarget.title
                );
                if (newOption) setOption((pre) => [...pre, newOption]);
              }
            }}
          >
            {`Add "${debouncedInputValue}"`}
          </SelectOption>
        )}
    </Combobox>
  );
};

export { Autocomplete };
