import { NavItem as ZendeskNavItem } from "@zendeskgarden/react-chrome";
import { NavItemArgs } from "./_types";
import styled from "styled-components";

const UgNavItem = styled(ZendeskNavItem)<NavItemArgs>`
  width: 100%;
  min-height: 16px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
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
  ${(props) => !props.isExpanded && "display: none;"}
`;

const NavDivider = (props: NavItemArgs) => (
  <UgNavItem {...props}>
    <span>{props.children}</span>
  </UgNavItem>
);

export { NavDivider };
