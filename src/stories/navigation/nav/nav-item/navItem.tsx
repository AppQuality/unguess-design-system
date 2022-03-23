import { NavItem as ZendeskNavItem } from "@zendeskgarden/react-chrome";
import { NavItemArgs } from "./_types";
import styled, { css } from "styled-components";

const SelectedItemStyle = css`
  background-color: ${(props) => props.theme.palette.kale["100"]};
`;

const UgNavItem = styled(ZendeskNavItem)<NavItemArgs>`
  border-top-left-radius: ${(props) => props.theme.space.base * 6}px;
  border-bottom-left-radius: ${(props) => props.theme.space.base * 6}px;
  ${(props) => !props.isExpanded && "display: none;"}
  ${(props) => props.isCurrent && SelectedItemStyle}
  &:hover, &:focus {
    ${SelectedItemStyle}
  }

  color: ${(props) => props.theme.palette.blue["600"]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  ${(props) =>
    props.isCurrent &&
    `
    color: ${props.theme.palette.blue["700"]};
    font-weight: ${props.theme.fontWeights.semibold};
  `}
`;

const NavItem = (props: NavItemArgs) => <UgNavItem {...props} />;

export { NavItem };
