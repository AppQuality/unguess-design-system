import {
  Dropdown,
  Multiselect,
  Field,
  Menu,
  Item as ZenDeskItem,
  Label,
} from "@zendeskgarden/react-dropdowns";
import { Tag } from "@zendeskgarden/react-tags";
import { MultiSelectProps } from "./_types";
import { Separator } from "../dropdowns/menu";
import { AddableItem } from "./AddableItem";
import { Item } from "./Item";
import { useOptions } from "./useOptions";

const DisabledItem = ({ label }: { label: string }) => (
  <ZenDeskItem disabled>{label}</ZenDeskItem>
);

export const MultiSelect = ({
  options,
  selectedItems,
  onChange,
  creatable,
  i18n,
  maxItems,
  size,
  menuHeight,
}: MultiSelectProps) => {
  const {
    isLoading,
    currentSelectedItems,
    matchingOptions,
    inputValue,
    setInputValue,
    selectItems,
  } = useOptions({ options, selectedItems, onChange });

  const itemToString = (item: typeof options[number]) => (item ? item.id : "");

  return (
    <div style={isLoading ? { pointerEvents: "none", opacity: "0.3" } : {}}>
      <Dropdown
        inputValue={inputValue}
        selectedItems={currentSelectedItems}
        onSelect={(items) => selectItems(items)}
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
                  onClick={() => {
                    selectItems(
                      currentSelectedItems.filter(
                        (item) => item.id !== value.id
                      )
                    );
                  }}
                />
              </Tag>
            )}
          />
        </Field>
        <Menu>
          <div style={{ maxHeight: menuHeight ?? "200px" }}>
            {matchingOptions.map((option) => {
              const items = currentSelectedItems.map((item) =>
                itemToString(item)
              );
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
                onClick={() => selectItems(currentSelectedItems, inputValue)}
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
    </div>
  );
};
