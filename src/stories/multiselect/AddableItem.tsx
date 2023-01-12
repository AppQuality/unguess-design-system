import {
  IItemProps as ZenDeskIItemProps,
  Item as ZenDeskItem,
} from "@zendeskgarden/react-dropdowns";
import { ReactComponent as GridAdd } from "../../assets/icons/plus.svg";

const CustomItem: React.ForwardRefExoticComponent<
  ZenDeskIItemProps & { addable: boolean } & React.RefAttributes<HTMLLIElement>
> = ZenDeskItem;

export const AddableItem = (props: ZenDeskIItemProps & { label: string }) => {
  return (
    <CustomItem onClick={props.onClick} addable disabled>
      <GridAdd
        style={{
          position: "absolute",
          left: "0.6%",
          top: "calc(50% - 8px)",
        }}
      />
      {props.label}
    </CustomItem>
  );
};
