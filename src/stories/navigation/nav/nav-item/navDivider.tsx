import { NavItem as ZendeskNavItem } from "@zendeskgarden/react-chrome";
import { NavDividerArgs, NavItemArgs } from "./_types";
import styled, { css } from "styled-components";

const UgNavItem = styled(ZendeskNavItem)<NavItemArgs>`
  ${(props) => !props.isExpanded && "display: none;"}
  width: 100%;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0;
  padding-right: ${(props) => props.theme.space.sm};
  pointer-events: none;

  &:after {
    background: ${(props) => props.theme.palette.grey["200"]};
    height: 1px;
    flex: 1;
    content: "";
  }

  span {
    background: #fff;
    margin: 0;
    margin-right: ${(props) => props.theme.space.sm};
    color: ${(props) => props.theme.palette.grey["500"]};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
`;

const NavDivider = (props: NavItemArgs) => (
  <UgNavItem {...props} id={"ciolla"}>
    <span>{props.children}</span>
  </UgNavItem>
);

export { NavDivider };
