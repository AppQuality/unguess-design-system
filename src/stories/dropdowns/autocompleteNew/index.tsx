import { Combobox, IComboboxProps, IOptGroupProps, IOptionProps, ISelectedOption, Option, OptionValue, Separator } from "@zendeskgarden/react-dropdowns.next";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  children: null;
  onOptionClick?: ({ inputValue, selectionValue }: OnOptionClickArgs) => void;
  onInputChange: (inputValue: string) => void;
  isCreatable?: boolean;
  // promise to create new IOption
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

// get the value from the option that can be a string or an object
function getValueFromOption(option: IOption | ISelectedOption) {
  return (typeof option.value === 'string')
    ? option.value
    // if the value is an object, we need to get the id property or convert it to string
    : (option.value as { id?: string }).id || option.value.toString();
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
const AutocompleteNew = ({ options, onOptionClick, onInputChange, onChange, isCreatable, onCreateNewOption, isMultiselectable, ...props }: AutocompleteProps) => {
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


  // const initialValue = useMemo(() => {
  //   // return the first value from the options or an array of values if the component is multiselectable
  //   const selectedOptions = flatOptions(options).filter(option => option.isSelected);
  //   if (isMultiselectable) {
  //     return selectedOptions.map(option => getValueFromOption(option));
  //   } else {
  //     return selectedOptions.length > 0 ? getValueFromOption(selectedOptions[0]) : undefined;
  //   }
  // }, []);

  // get a list of all the values from the options
  // const values = useMemo(() => {
  //   return options.reduce<string[]>((acc, option) => {
  //     if ('options' in option) {
  //       return [...acc, ...option.options.map(opt => getValueFromOption(opt))];
  //     }
  //     return [...acc, getValueFromOption(option)];
  //   }, []);
  // }, [options]);

  const handleChange = useCallback<NonNullable<IComboboxProps['onChange']>>(event => {
    console.log("event", event);
    if (typeof onChange === 'function') {
      onChange(event);
    }

    if (event.type === "input:change" && event.inputValue !== undefined) {
      const sanitizedInputValue = event.inputValue.replace(/[.*+?^${}()|[\]\\]/giu, '\\$&');
      setInputValue(sanitizedInputValue);
      onInputChange(sanitizedInputValue);
    }
    if (event.type === "option:click" && typeof onOptionClick === 'function') {
      // setSelectionValue(event.selectionValue);
      setInputValue(undefined);
      onOptionClick({ inputValue: event.inputValue, selectionValue: event.selectionValue });
    }
  }, []);

  const debounceHandleChange = useMemo(() => debounce(handleChange, 300), [handleChange]);

  return (<>
      <br/>
      {/* inputValue: {inputValue} <br/> */}
      {/* selectionValue: {selectionValue} <br/> */}
      internal options: {JSON.stringify(_options)} <br/>
    <Combobox {...props}
      isAutocomplete
      // inputValue={inputValue}
      onChange={debounceHandleChange}
      // defaultValue={initialValue}
      // selectionValue={selectionValue}
      // renderValue={({selection, inputValue}) => {
      //   if (inputValue) return inputValue;
      //   if (!selection) return '';
      //   if (Array.isArray(selection))
      //     return selection.map(s => s.label || getValueFromOption(s)).join(', ')
      //   return selection.label || getValueFromOption(selection);
      // }}
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
            // e.preventDefault();
            // e.bubbles = false;
            // e.stopPropagation();
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
    </>)
}

export { AutocompleteNew };
