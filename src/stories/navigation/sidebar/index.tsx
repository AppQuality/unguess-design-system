import { Nav } from "../nav";
import {
  NavItem,
  NavItemIcon,
  NavItemText,
  NavToggle,
  NavDivider,
  NavItemProject,
} from "../nav/nav-item";
import { ReactComponent as HomeIcon } from "../../../assets/icons/home-fill.svg";
import { ReactComponent as HomeIconStyled } from "../../../assets/icons/home-fill-styled.svg";
import { ReactComponent as TokenIcon } from "../../../assets/icons/token.svg";

import { SidebarArgs } from "./_types";
import { useState } from "react";
import { theme } from "../../theme";
import { Logo } from "../../logo";
import { Card } from "../../cards";
import styled from "styled-components";
import { Span } from "../../typography/span";
import { LoadingSidebar } from "./skeleton";
import { WorkspacesDropdown } from "../header/header-item/workspacesDropdown";

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollingContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;
  overflow-y: auto;
  height: 100%;
`;

const StyledNavItem = styled(NavItem)`
  ${({ isExpanded }) =>
    isExpanded &&
    `
    display: block;
    padding-right: ${theme.space.md};
  `};

  &:hover,
  &:focus {
    background-color: white;
  }
`;

/**
 * The UNGUESS Sidebar component provides a high-level layout structure and sets a framework for navigating around projects.
 * <br>
 * Used for this:
    - To give a consistent dashboard and navigation experience
 */
const Sidebar = (props: SidebarArgs) => {
  const [nav, setNav] = useState(props.currentRoute || "home");

  const toggleNav = () => {
    props.onToggleMenu && props.onToggleMenu();
  };

  const navigate = (route: string) => {
    props.onNavToggle && props.onNavToggle(route);
    setNav(route);
  };

  return props.isLoading ? (
    <LoadingSidebar />
  ) : (
    <Nav {...props}>
      <NavToggle onClick={toggleNav} isExpanded={props.isExpanded} />
      {props.workspaces && props.workspaces.length > 1 && (
        <>
          <StyledNavItem hasLogo isExpanded={props.isExpanded} style={{ paddingBottom: 0}}>
            <WorkspacesDropdown
              workspaces={props.workspaces}
              workspacesLabel={props.workspacesLabel}
              activeWorkspace={props.activeWorkspace}
              onWorkspaceChange={props.onWorkspaceChange}
            />
          </StyledNavItem>
          {props.tokens && (
            <NavDivider isExpanded={props.isExpanded} style={{order: 0}} />
          )}
        </>
      )}
      {props.tokens && (
        <StyledNavItem
          hasLogo
          isExpanded={props.isExpanded}
          style={{ pointerEvents: "none", paddingTop: 0 }}
        >
          <Card style={{ padding: theme.space.sm }}>
            <TokenContainer>
              <TokenIcon width={32} />
              <Span isBold style={{ marginLeft: theme.space.xs, color: theme.palette.grey[800] }}>
                {props.tokens + " " + (props.tokensLabel || "tokens")}
              </Span>
            </TokenContainer>
          </Card>
        </StyledNavItem>
      )}
      <NavItem
        isExpanded={props.isExpanded}
        isCurrent={nav === "home"}
        onClick={() => navigate("home")}
      >
        <NavItemIcon isStyled>
          {nav === "home" ? <HomeIconStyled /> : <HomeIcon />}
        </NavItemIcon>
        <NavItemText>{props.homeItemLabel || "My Campaigns"}</NavItemText>
      </NavItem>

      <NavDivider isExpanded={props.isExpanded}>
        {props.dividerLabel || ""}
      </NavDivider>
      <ScrollingContainer>
        {props.projects &&
          props.projects.map((project) => (
            <NavItemProject
              key={project.id}
              isExpanded={props.isExpanded}
              isCurrent={nav === project.id}
              onClick={() => navigate(project.id)}
            >
              <NavItemProject.Title
                title={project.title}
                children={project.title}
              />
              <NavItemProject.SubTitle children={project.campaigns} />
            </NavItemProject>
          ))}
      </ScrollingContainer>

      {/* Footer Logo */}
      <NavItem
        isExpanded={props.isExpanded}
        hasBrandmark
        title="Be smart from the start"
        style={{ pointerEvents: "none", paddingBottom: theme.space.md }}
      >
        <NavItemIcon>
          <Logo type={"icon"} size={150} />
        </NavItemIcon>
        <NavItemText>UNGUESS</NavItemText>
      </NavItem>
    </Nav>
  );
};

export { Sidebar };
