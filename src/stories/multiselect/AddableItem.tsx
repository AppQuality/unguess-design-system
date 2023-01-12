import { StyledItem, IItemProps } from "./Item";
import { ReactComponent as GridAdd } from "../../assets/icons/plus.svg";

const CustomItem: (props: IItemProps & { addable: boolean }) => JSX.Element =
  StyledItem;

export const AddableItem = (props: IItemProps & { label: string }) => {
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
