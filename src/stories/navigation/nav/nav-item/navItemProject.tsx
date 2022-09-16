import { NavItem } from "./navItem";
import { NavItemArgs } from "./_types";
import styled from "styled-components";
import { NavItemText } from "./navItemText";

const UgProjectSubtitle = styled(NavItemText)<NavItemArgs>`
  color: ${(props) => props.theme.palette.grey["500"]};
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const UgNavItem = styled(NavItem)<NavItemArgs>`
  flex-flow: column;
  align-items: flex-start;
  padding: 12px 8px;
  padding-left: ${({ theme }) => theme.space.xxl}; //Accordion Alingment
`;

const NavItemProject = (props: NavItemArgs) => <UgNavItem {...props} />;
NavItemProject.Title = NavItemText;
NavItemProject.SubTitle = UgProjectSubtitle;

export { NavItemProject };
