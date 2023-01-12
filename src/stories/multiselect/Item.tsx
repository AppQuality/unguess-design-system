import {
  IItemProps as ZenDeskIItemProps,
  Item as ZenDeskItem,
} from "@zendeskgarden/react-dropdowns";
import { MultiSelectProps } from "./_types";

export type IItemProps = ZenDeskIItemProps & { checked?: boolean };

const CustomItem: React.ForwardRefExoticComponent<
  IItemProps & React.RefAttributes<HTMLLIElement>
> = ZenDeskItem;

export const Item = ({
  option,
  checked,
}: IItemProps & {
  checked: boolean;
  option: MultiSelectProps["options"][number];
}) => {
  return (
    <CustomItem
      key={`${option.label}-${option.id}`}
      value={option}
      checked={checked}
    >
      <span>{option.label}</span>
    </CustomItem>
  );
};
