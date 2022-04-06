import styled, { css } from "styled-components";
import { MenuItemIcon, StyledMenuItemIcon } from "./menuItemIcon";
import { NextItemArgs } from "../dropdowns/menu/_types";
import { flexCenter, flexColumnCenter, flexStart } from "../theme/mixins";

import { theme } from "../theme";
import { MenuItemProps } from "./_types";

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
const StyledItem = styled.li<IStyledItemProps>`
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
  height: 52px;
  padding: ${theme.space.xs} ${theme.space.md};

  ${(props) => `
  &:hover,
  &:focus,
  &:active {
    background-color: ${theme.palette.kale[100]};
    color: ${props.isDanger ? theme.palette.red[500] : theme.palette.grey[800]};
  }`};

  ${StyledMenuItemIcon} {
    right: ${(props) =>
      props.theme.rtl ? "auto" : `${props.theme.space.base * 3}px`};
    left: ${(props) =>
      props.theme.rtl ? `${props.theme.space.base * 3}px` : "auto"};
  }
`;

const IconContainer = styled.div`
  margin-right: ${({ theme }) => theme.space.sm};
  margin-top: 3px;
`;

export const MenuItem = ({
  children,
  selectedItem,
  ...props
}: MenuItemProps) => {
  const isActive = selectedItem && selectedItem === props.value;
  const isVisible = isActive || selectedItem === "";

  if (!isVisible) return <></>;

  return isActive ? (
    <>
      {props.content}
      <br />
      --- DEBUG ---
      Opened {props.value} <br />
      <button onClick={() => props.setActive("")}>&lt; Back</button>
    </>
  ) : (
    <StyledItem {...props} onClick={() => props.setActive(props.value)}>
      {props.icon && <IconContainer>{props.icon}</IconContainer>}
      {children}
      <MenuItemIcon />
    </StyledItem>
  );
};
