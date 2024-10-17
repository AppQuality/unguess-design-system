import { Combobox, IComboboxProps, IOptGroupProps, IOptionProps, ISelectedOption, Option, OptionValue, Separator } from "@zendeskgarden/react-dropdowns.next";
import { useCallback, useMemo, useState } from "react";
import { OptGroup } from "../optGroup";

interface OnOptionClickArgs {
  inputValue?: string;
  selectionValue?: OptionValue | OptionValue[] | null;
}

interface IOption extends IOptionProps {
  id: string; // override the id prop because propr value can be an object
  label: string; // override this, we need a label to filter the options
}
interface IOptGroup extends IOptGroupProps {
  id: string; // override the id prop to have a key to iterate over the options
  options: Array<IOption>;
}

export interface AutocompleteProps extends IComboboxProps {
  onOptionClick?: ({ inputValue, selectionValue }: OnOptionClickArgs) => void;
  onInputChange?: (inputValue: string) => void;
  isCreatable?: boolean;
  onCreateNewOption?: (inputValue: string) => Promise<IOption>;
  options: Array<IOptGroup | IOption>;
}
// debounce a function call
function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// flat the options array that can have nested options
function flatOptions(options: AutocompleteProps['options']) {
  return options.reduce<IOption[]>((acc, option) => {
    if ('options' in option) {
      return [...acc, ...option.options];
    }
    return [...acc, option];
  }, []);
}

  // utility function to check visibility based on the input value in the input field
  function isHidden(option: IOption, inputValue?: string) {
    if (!inputValue) return false;
    const regex = new RegExp(inputValue, 'giu');
    return !option.label.match(regex);
  };

/**
 * Autocomplete is an input field that filters results as users type. This helps users find something quickly in a large list of options.
 * <hr>
 * Used for this:
    - To filter down a large list of options
    - To quickly find a known option
 * Not for this:
    - To make more than one selection, use Multiselect instead
 */
const Autocomplete = ({ options, onOptionClick, onInputChange, onChange, isCreatable, onCreateNewOption, isMultiselectable, ...props }: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [_options, setOption] = useState(options);
  // const [selectionValue, setSelectionValue] = useState<OptionValue | OptionValue[] | null>();

  // update options isHidden property based on inputValue
  const matchingOptions = useMemo(() => _options.map((opt) => {
    if ('options' in opt) {
      return {
        ...opt,
        options: opt.options.map((o) => ({
          ...o,
          isHidden: isHidden(o, inputValue)
        })) 
      };
    }
    return {
      ...opt,
      isHidden: isHidden(opt, inputValue)
    };
  }), [_options, inputValue]);

  // check if there are visible options
  const thereAreVisibleOptions = useMemo(() => (
    flatOptions(matchingOptions).some(opt => opt.isHidden !== true)
  ), [matchingOptions]);

  const handleChange = useCallback<NonNullable<IComboboxProps['onChange']>>(event => {
    if (typeof onChange === 'function') {
      onChange(event);
    }

    if (event.type === "input:change" && event.inputValue !== undefined) {
      const sanitizedInputValue = event.inputValue.replace(/[.*+?^${}()|[\]\\]/giu, '\\$&');
      setInputValue(sanitizedInputValue);
      if (typeof onInputChange === 'function') onInputChange(sanitizedInputValue);
    }
    if (event.type === "option:click" && typeof onOptionClick === 'function') {
      // setSelectionValue(event.selectionValue);
      setInputValue(undefined);
      onOptionClick({ inputValue: event.inputValue, selectionValue: event.selectionValue });
    }
  }, []);

  const debounceHandleChange = useMemo(() => debounce(handleChange, 300), [handleChange]);

  return (
    <Combobox
      {...props}
      isAutocomplete
      onChange={debounceHandleChange}
    >
      {matchingOptions.map((option, index) => {
        if ('options' in option) {
          return (
            <OptGroup key={option.id} {...option}>
              {option.options.map((opt) => (
                <Option key={opt.id} {...opt} />
              ))}
            </OptGroup>
          );
        }
        return <Option key={index} {...option} />;
      })}
      {!thereAreVisibleOptions && <Option value="" isDisabled>No results found</Option>}
      {isCreatable && inputValue &&
        <Option
          type='add'
          value={inputValue}
          title={inputValue}
          onClickCapture={async (e) => {
            if (typeof onCreateNewOption === 'function') {
              const newOption = await onCreateNewOption(e.currentTarget.title);
              setOption(pre => [...pre, newOption]);
            }
          }}
        >
          {`Add "${inputValue}"`}
        </Option>
      }
    </Combobox>
  );
}

export { Autocomplete };
