import { NavItem as ZendeskNavItem } from "@zendeskgarden/react-chrome";
import { NavItemArgs } from "./_types";
import styled, { css } from "styled-components";
import {
  sidebarNavItemExpanded,
  sidebarNavItemHidden,
  getColor,
} from "../../../theme/utils";
import { forwardRef } from "react";

const SelectedItemStyle = css`
  background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 600, theme, 0.08)};
`;

const UgNavItem = styled(ZendeskNavItem)<NavItemArgs>`
  border-top-left-radius: ${(props) => props.theme.space.base * 6}px;
  border-bottom-left-radius: ${(props) => props.theme.space.base * 6}px;
  font-family: ${({ theme }) => theme.fonts.system};
  ${sidebarNavItemExpanded}
  ${(props) => !props.isExpanded && sidebarNavItemHidden}
  ${(props) => props.isCurrent && SelectedItemStyle}
  &:focus, &:hover {
    ${SelectedItemStyle}
  }
  color: ${(props) => getColor(props.theme.colors.primaryHue, 600)};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  ${(props) =>
    props.isCurrent &&
    `
    color: ${props.theme.palette.blue["700"]};
    font-weight: ${props.theme.fontWeights.semibold};
  `}
  margin: ${({ theme }) => theme.space.xs} 0;
`;

const NavItem = forwardRef<HTMLButtonElement, NavItemArgs>((props, ref) => <UgNavItem ref={ref} {...props} />);

export { NavItem };
