import { IItemProps, Item } from "@zendeskgarden/react-dropdowns";
import { ReactComponent as GridAdd } from "../../assets/icons/grid-add.svg";

const CustomItem: React.ForwardRefExoticComponent<
  IItemProps & { addable?: boolean } & React.RefAttributes<HTMLLIElement>
> = Item;

export const AddableItem = (props: IItemProps & { label: string }) => {
  return (
    <CustomItem onClick={props.onClick} addable disabled>
      <GridAdd />
      {props.label}
    </CustomItem>
  );
};
