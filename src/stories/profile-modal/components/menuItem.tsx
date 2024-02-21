import styled from "styled-components";
import { MenuItemIcon, StyledMenuItemIcon } from "./menuItemIcon";
import { flexCenter, flexStart } from "../../theme/mixins";

import { theme } from "../../theme";
import { MenuItemProps } from "../_types";
import { getColor } from "../../theme/utils";

export interface IStyledItemProps {
  isFocused?: boolean;
  isCompact?: boolean;
  isDanger?: boolean;
  disabled?: boolean;
  checked?: boolean;
}

/**
 * 1. Allows an item to contain a positioned sub-menu.
 * 2. Reset stacking context for sub-menu css-arrows.
 **/
const StyledItem = styled.li<MenuItemProps>`
  display: block;
  position: relative; /* [1] */
  z-index: 0; /* [2] */
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  text-decoration: none;
  line-height: ${(props) => props.theme.space.base * 5}px;
  word-wrap: break-word;
  user-select: none;
  &:first-child {
    margin-top: ${(props) => props.theme.space.base}px;
  }
  &:last-child {
    margin-bottom: ${(props) => props.theme.space.base}px;
  }
  &:focus {
    outline: none;
  }

  width: fill-available;
  ${flexCenter}
  height: ${theme.space.xxl};
  padding: ${theme.space.xs} ${theme.space.md};

  ${(props) => `
  &:hover,
  &:focus,
  &:active {
    background-color: ${getColor(props.theme.colors.primaryHue, 600, undefined, 0.08)};
    color: ${props.isDanger ? theme.palette.red[500] : theme.palette.grey[800]};
  }`};

  ${StyledMenuItemIcon} {
    right: ${(props) =>
      props.theme.rtl ? "auto" : `${props.theme.space.base * 3}px`};
    left: ${(props) =>
      props.theme.rtl ? `${props.theme.space.base * 3}px` : "auto"};
  }
`;

const StyledBody = styled.li`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IconContainer = styled.div`
  margin-right: ${({ theme }) => theme.space.sm};
  margin-top: 3px;
`;

export const MenuItemBody = styled.div`
  ${flexStart}
`;


export const MenuItem = ({
  children,
  selectedItem,
  content,
  ...props
}: MenuItemProps) => {
  const isActive = selectedItem && selectedItem === props.value;
  const isVisible = isActive || selectedItem === "";

  if (!isVisible) return <></>;

  return isActive && content ? (
    <StyledBody key={props.value}>
      {content}
    </StyledBody>
  ) : (
    <StyledItem key={props.value} {...props} onClick={() => props.setActive(props.value)}>
      {props.icon && <IconContainer>{props.icon}</IconContainer>}
      {children}
      {content && <MenuItemIcon />}
    </StyledItem>
  );
};
