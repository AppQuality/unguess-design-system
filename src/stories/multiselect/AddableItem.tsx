import {
  IItemProps as ZenDeskIItemProps,
  Item as ZenDeskItem,
} from "@zendeskgarden/react-dropdowns";
import styled from "styled-components";
import { ReactComponent as GridAddComponent } from "../../assets/icons/plus.svg";

const CustomItem: React.ForwardRefExoticComponent<
  ZenDeskIItemProps & { addable: boolean } & React.RefAttributes<HTMLLIElement>
> = ZenDeskItem;

const GridAdd = styled(GridAddComponent)`
  display: flex;
  position: absolute;
  top: 0;
  left: 12px;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: calc(20px + 16px);
`;

export const AddableItem = (props: ZenDeskIItemProps & { label: string }) => {
  return (
    <CustomItem onClick={props.onClick} addable disabled>
      <GridAdd />
      {props.label}
    </CustomItem>
  );
};
