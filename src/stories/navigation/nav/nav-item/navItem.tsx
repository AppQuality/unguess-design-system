import { NavItem as ZendeskNavItem } from "@zendeskgarden/react-chrome";
import { NavItemArgs } from "./_types";
import styled from "styled-components";
import {
  sidebarNavItemExpanded,
  sidebarNavItemHidden,
} from "../../../theme/utils";
import { forwardRef } from "react";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";

const UgNavItem = styled(ZendeskNavItem)<NavItemArgs>`
  ${sidebarNavItemExpanded}
  ${(props) => !props.isExpanded && sidebarNavItemHidden}
  margin: ${({ theme }) => theme.space.xs} 0;
  ${(props) => retrieveComponentStyles("navigation.hoverableItem", props)};
`;

const NavItem = forwardRef<HTMLButtonElement, NavItemArgs>((props, ref) => <UgNavItem ref={ref} {...props} />);

export { NavItem };
