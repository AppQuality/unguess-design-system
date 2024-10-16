import { Combobox, IComboboxProps, Option, OptionValue, Separator } from "@zendeskgarden/react-dropdowns.next";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

interface OnOptionClickArgs {
  inputValue?: string;
  selectionValue?: OptionValue | OptionValue[] | null;
  isNew?: boolean;
}
export interface AutocompleteProps extends IComboboxProps {
  onOptionClick?: ({ inputValue, selectionValue }: OnOptionClickArgs) => void;
  onInputChange: (inputValue: string) => void;
  isCreatable?: boolean;
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
const AutocompleteNew = ({ children, onOptionClick, onInputChange, onChange, isCreatable, ...props }: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = useCallback<NonNullable<IComboboxProps['onChange']>>((event,) => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
    if (event.type === "input:change" && event.inputValue !== undefined) {
      const sanitizedInputValue = event.inputValue.replace(/[.*+?^${}()|[\]\\]/giu, '\\$&');
      setInputValue(sanitizedInputValue);
      onInputChange(sanitizedInputValue);
    }
    if (event.type === "option:click" && typeof onOptionClick === 'function') {
      onOptionClick({ inputValue: event.inputValue, selectionValue: event.selectionValue, isNew: (!!event.selectionValue && !event.inputValue) });
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
      {isCreatable && inputValue &&
        <Option
          type='add'
          value={inputValue}
          label={inputValue}
          title="Create new item"
        />
      }
    </Combobox>
  )
}

export { AutocompleteNew };
