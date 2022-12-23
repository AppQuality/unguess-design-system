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
import { useOptions } from "./useOptions";

const Item = ({ option }: { option: MultiSelectProps["options"][number] }) => (
  <ZenDeskItem key={`${option.label}-${option.id}`} value={option}>
    <span>{option.label}</span>
  </ZenDeskItem>
);

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
}: MultiSelectProps) => {
  const {
    isLoading,
    currentSelectedItems,
    matchingOptions,
    inputValue,
    setInputValue,
    selectItems,
  } = useOptions({ options, selectedItems, onChange });

  return (
    <div style={isLoading ? { pointerEvents: "none", opacity: "0.3" } : {}}>
      <Dropdown
        inputValue={inputValue}
        selectedItems={currentSelectedItems}
        onSelect={(items) => selectItems(items)}
        downshiftProps={{
          itemToString: (item: typeof options[number]) => (item ? item.id : ""),
        }}
        onInputValueChange={(value) => setInputValue(value)}
      >
        <Field>
          <Label hidden>{i18n?.label ?? "Multiselect"}</Label>
          <Multiselect
            maxItems={maxItems}
            renderItem={({ value }) => (
              <Tag>
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
          {matchingOptions.map((option) => (
            <Item option={option} />
          ))}
          {matchingOptions.length === 0 && (
            <DisabledItem label={i18n?.noMatches ?? "No matches found"} />
          )}
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
