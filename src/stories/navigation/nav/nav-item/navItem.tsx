import { NavItem as ZendeskNavItem } from "@zendeskgarden/react-chrome";
import { NavItemArgs } from "./_types";
import styled from "styled-components";
import {
  sidebarNavItemExpanded,
  sidebarNavItemHidden,
} from "../../../theme/utils";
import { forwardRef } from "react";

const UgNavItem = styled(ZendeskNavItem)<NavItemArgs>`
  border-top-left-radius: ${(props) => props.theme.space.base * 6}px;
  border-bottom-left-radius: ${(props) => props.theme.space.base * 6}px;
  font-family: ${({ theme }) => theme.fonts.system};
  ${sidebarNavItemExpanded}
  ${(props) => !props.isExpanded && sidebarNavItemHidden}
  color: ${(props) => props.theme.colors.primaryHue};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  ${(props) =>
    props.isCurrent && `
    color: ${props.theme.palette.blue["700"]};
    font-weight: ${props.theme.fontWeights.semibold};
    background-color: ${props.theme.colors.menuSelected};
  `}
  margin: ${({ theme }) => theme.space.xs} 0;
  &:hover {
    background-color: ${p => p.theme.colors.menuHover};
  }
  &:focus, &:active {
    background-color: ${p => p.theme.colors.menuSelected};
  }
`;

const NavItem = forwardRef<HTMLButtonElement, NavItemArgs>((props, ref) => <UgNavItem ref={ref} {...props} />);

export { NavItem };
