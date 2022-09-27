import { NavItem } from "./navItem";
import { NavItemArgs } from "./_types";
import styled from "styled-components";
import { NavItemText } from "./navItemText";
import { forwardRef } from "react";

const UgProjectSubtitle = styled(NavItemText)<NavItemArgs>`
  color: ${(props) => props.theme.palette.grey["500"]};
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

const UgNavItem = styled(NavItem)<NavItemArgs>`
  flex-flow: column;
  align-items: flex-start;
  padding: 12px 8px;
  opacity: 1;
  padding-left: ${({ theme }) => theme.space.xxl}; //Accordion Alingment
`;

const NavItemComponent = forwardRef<HTMLButtonElement, NavItemArgs>(
  (props, ref) => <UgNavItem ref={ref} {...props} />
);

const NavItemProject = NavItemComponent as typeof NavItemComponent & {
  Title: typeof NavItemText;
  SubTitle: typeof UgProjectSubtitle;
};

NavItemProject.Title = NavItemText;
NavItemProject.SubTitle = UgProjectSubtitle;

export { NavItemProject };
