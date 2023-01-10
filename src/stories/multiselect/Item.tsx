import {
  IItemProps as ZenDeskIItemProps,
  Item as ZenDeskItem,
} from "@zendeskgarden/react-dropdowns";
import styled from "styled-components";
import { MultiSelectProps } from "./_types";

export type IItemProps = ZenDeskIItemProps & { checked?: boolean };

const CustomItem: React.ForwardRefExoticComponent<
  IItemProps & React.RefAttributes<HTMLLIElement>
> = ZenDeskItem;

export const StyledItem = styled(CustomItem)`
  &:hover {
    background-color: ${(props) => props.theme.palette.kale["100"]}};
  }
`;

export const Item = ({
  option,
  checked,
}: IItemProps & {
  checked: boolean;
  option: MultiSelectProps["options"][number];
}) => {
  return (
    <StyledItem
      key={`${option.label}-${option.id}`}
      value={option}
      checked={checked}
    >
      <span>{option.label}</span>
    </StyledItem>
  );
};
