import { Combobox, IComboboxProps, Option, OptionValue } from "@zendeskgarden/react-dropdowns.next";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export interface AutocompleteProps extends IComboboxProps {
  onOptionClick?: (value?: OptionValue | OptionValue[] | null) => void;
  onInputChange: (inputValue: string) => void;
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
const AutocompleteNew = ({ children, onOptionClick, onInputChange, onChange, ...props }: AutocompleteProps) => {

  const handleChange = useCallback<NonNullable<IComboboxProps['onChange']>>((event) => {
    // to override the default onChange event
    if (typeof onChange === 'function') {
      onChange(event);
    }
    if (event.type === "input:change" && event.inputValue !== undefined) {
      onInputChange(event.inputValue.replace(/[.*+?^${}()|[\]\\]/giu, '\\$&'));
    }
    if (event.type === "option:click" && typeof onOptionClick === 'function') {
      onOptionClick(event.inputValue);
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
      {children}
    </Combobox>
  )
}

export { AutocompleteNew };
