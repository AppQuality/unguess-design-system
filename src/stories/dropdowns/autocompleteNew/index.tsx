import { Combobox, IComboboxProps, IOptGroupProps, IOptionProps, Option, OptionValue, Separator } from "@zendeskgarden/react-dropdowns.next";
import { useCallback, useMemo, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { OptGroup } from "../optGroup";

interface OnOptionClickArgs {
  inputValue?: string;
  selectionValue?: OptionValue | OptionValue[] | null;
}

interface IOption extends IOptionProps {
  id: string; // override the id prop
}
interface IOptGroup extends IOptGroupProps {
  id: string; // override the id prop
  options: Array<IOption>;
}

export interface AutocompleteProps extends IComboboxProps {
  onOptionClick?: ({ inputValue, selectionValue }: OnOptionClickArgs) => void;
  onInputChange: (inputValue: string) => void;
  isCreatable?: boolean;
  onCreateNewOption?: (inputValue: any) => void;
  options: Array<IOption> | Array<IOptGroup>;
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
const AutocompleteNew = ({ options, onOptionClick, onInputChange, onChange, isCreatable, onCreateNewOption, ...props }: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>();

  const handleChange = useCallback<NonNullable<IComboboxProps['onChange']>>(event => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
    if (event.type === "input:change" && event.inputValue !== undefined) {
      const sanitizedInputValue = event.inputValue.replace(/[.*+?^${}()|[\]\\]/giu, '\\$&');
      setInputValue(sanitizedInputValue);
      onInputChange(sanitizedInputValue);
    }
    if (event.type === "option:click" && typeof onOptionClick === 'function') {
        onOptionClick({ inputValue: event.inputValue, selectionValue: event.selectionValue });
    }
  }, []);

  const debounceHandleChange = useMemo(() => useDebounce(handleChange, 300), [handleChange]);
  return (
    <Combobox {...props} isAutocomplete inputValue={inputValue} onChange={debounceHandleChange}>
      {options.length > 0 && options.map((option, index) => {
        if ('options' in option) {
          const {options: internalOptions, id} = option;
          return (
            <OptGroup key={id} {...option}>
              {internalOptions.map((opt) => (
                <Option key={opt.id} {...opt} />
              ))}
            </OptGroup>
          );
        }
        return <Option key={index} {...option} />;
      })}
      {isCreatable && inputValue &&
        <Option
          type='add'
          value={inputValue}
          title={inputValue}
          onClickCapture={(e) => {
            // e.preventDefault();
            // e.bubbles = false;
            // e.stopPropagation();
            if (typeof onCreateNewOption === 'function') {
              onCreateNewOption(e.currentTarget.title);
            }
          }}
        >
          {`Add "${inputValue}"`}
        </Option>
      }
    </Combobox>
  )
}

export { AutocompleteNew };
