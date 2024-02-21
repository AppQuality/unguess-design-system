import styled from "styled-components";
import { theme } from "../../theme";

import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron-left-stroke.svg";

interface IStyledItemIconProps {
  isCompact?: boolean;
  isVisible?: boolean;
  isDisabled?: boolean;
}

export const StyledMenuItemIcon = styled.div<IStyledItemIconProps>`
  display: flex;
  transition: opacity 0.1s ease-in-out;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  color: ${(props) => (props.isDisabled ? "inherit" : theme.palette.grey[600])};
  margin-left: auto;
  & > * {
    width: ${(props) => props.theme.iconSizes.md};
    height: ${(props) => props.theme.iconSizes.md};
  }
`;

export const MenuItemIcon = (props: IStyledItemIconProps) => (
  <StyledMenuItemIcon isVisible {...props}>
      <ChevronIcon />
  </StyledMenuItemIcon>
);
