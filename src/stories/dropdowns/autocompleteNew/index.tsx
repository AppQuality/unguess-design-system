import { Combobox, IComboboxProps, Option, OptionValue } from "@zendeskgarden/react-dropdowns.next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export interface AutocompleteProps extends IComboboxProps {
  options: {
    label: string;
    value: string;
    [key: string]: any;
  }[];
  onOptionClick?: (value?: OptionValue | OptionValue[] | null) => void;
  renderOption?: (option: AutocompleteProps['options'][0]) => React.ReactNode;
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
const AutocompleteNew = ({ options, renderOption, onOptionClick, ...props }: AutocompleteProps) => {
  const [_options, setOptions] = useState(options);

  function filterOptions(inputValue?: string) {
    if (inputValue !== undefined) {
      if (inputValue === '') {
        setOptions(options);
      } else {
        const regex = new RegExp(inputValue.replace(/[.*+?^${}()|[\]\\]/giu, '\\$&'), 'giu');
        
        setOptions(options.filter(option => option.label.match(regex)));
      }
    }
  }

  const handleChange = useCallback<NonNullable<IComboboxProps['onChange']>>((event) => {
    if (event.type === "input:change") {
      filterOptions(event.inputValue);
    }
    if (event.type === "option:click" && typeof onOptionClick === 'function') {
      onOptionClick(event.selectionValue);
    }
    if (typeof props.onChange === 'function') {
      props.onChange(event);
    }
  }, []);

  const debounceHandleChange = useMemo(() => debounce(handleChange, 300), [handleChange]);

  useEffect(() => {
    return () => {
      debounceHandleChange.cancel();
    };
  }, [debounceHandleChange]);
  return (
    <Combobox {...props} isAutocomplete onChange={debounceHandleChange}>
      {_options.length === 0 ? (
        <Option isDisabled label="" value="No matches found" />
      ) : (
        _options.map(option => <Option key={option.value} value={option.value} label={option.label}>
          {typeof renderOption === 'function' ? renderOption(option) : option.label}
        </Option>)
      )}
    </Combobox>
  )
}

export { AutocompleteNew };
