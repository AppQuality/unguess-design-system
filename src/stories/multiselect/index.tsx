import { Multiselect } from "@zendeskgarden/react-dropdowns";
import { Dropdown } from "../dropdowns/select";
import { Field } from "../dropdowns/field";
import { Menu } from "../dropdowns/menu";
import { Item as ZenDeskItem } from "../dropdowns/item";
import { Label } from "../label";
import { useEffect, useState } from "react";
import { Tag } from "@zendeskgarden/react-tags";
import { MultiSelectProps } from "./_types";
import { Separator } from "../dropdowns/menu";
import { AddableItem } from "./AddableItem";
import { Item } from "./Item";

const DisabledItem = ({ label }: { label: string }) => (
  <ZenDeskItem disabled>{label}</ZenDeskItem>
);

export const MultiSelect = ({
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
  const itemToString = (item: typeof options[number]) => (item ? item.id : "");

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
    <Dropdown
      inputValue={inputValue}
      selectedItems={options.filter((option) => option.selected)}
      onSelect={(items: typeof options) =>
        onChange &&
        onChange(
          options.map((o) => ({
            ...o,
            selected: items.some((i) => i.id === o.id),
          }))
        )
      }
      downshiftProps={{ itemToString }}
      onInputValueChange={(value) => setInputValue(value)}
    >
      <Field>
        <Label hidden>{i18n?.label ?? "Multiselect"}</Label>
        <Multiselect
          placeholder={i18n?.placeholder ?? "Select Items"}
          isCompact={size !== "medium"}
          maxItems={maxItems}
          renderItem={({ value }) => (
            <Tag isPill>
              <span>{value.label}</span>
              <Tag.Close
                onClick={() =>
                  onChange &&
                  onChange(
                    options.map((o) => ({
                      ...o,
                      selected: o.selected && o.id !== value.id,
                    }))
                  )
                }
              />
            </Tag>
          )}
        />
      </Field>
      <Menu>
        <div style={{ maxHeight: menuHeight ?? "200px" }}>
          {matchingOptions.map((option) => {
            const items = options
              .filter((o) => o.selected)
              .map((item) => itemToString(item));
            return (
              <Item
                option={option}
                checked={items.includes(itemToString(option))}
              />
            );
          })}
          {matchingOptions.length === 0 && (
            <DisabledItem label={i18n?.noMatches ?? "No matches found"} />
          )}
        </div>
        {creatable &&
        inputValue.length > 0 &&
        !matchingOptions.find(
          (item) => item.label.toLowerCase() === inputValue.toLowerCase()
        ) ? (
          <>
            <Separator />
            <AddableItem
              onClick={async () => {
                onChange && (await onChange(options, inputValue));
                setInputValue("");
              }}
              label={
                i18n?.addNew
                  ? i18n.addNew(inputValue)
                  : `Want to add ${inputValue}?`
              }
            />
          </>
        ) : null}
      </Menu>
    </Dropdown>
  );
};
