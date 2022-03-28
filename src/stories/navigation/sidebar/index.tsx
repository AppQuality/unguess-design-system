import { Nav } from "../nav";
import { NavItem, NavItemIcon, NavItemText, NavToggle, NavDivider, NavItemProject } from "../nav/nav-item";
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

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  return (
    <Nav {...props}>
      <NavToggle onClick={toggleNav} isExpanded={props.isExpanded} />
      {props.tokens && (
        <NavItem
          hasLogo
          isExpanded={props.isExpanded}
          style={{ pointerEvents: "none", paddingTop: 0 }}
        >
          <Card style={{ padding: theme.space.sm, width: "70%" }}>
            <TokenContainer>
              <TokenIcon width={32} />
              <Span isBold style={{ marginLeft: theme.space.xs }}>
                12 Tokens
              </Span>
            </TokenContainer>
          </Card>
        </NavItem>
      )}
      <NavItem
        isExpanded={props.isExpanded}
        isCurrent={nav === "home"}
        onClick={() => setNav("home")}
      >
        <NavItemIcon isStyled>
          {nav === "home" ? <HomeIconStyled /> : <HomeIcon />}
        </NavItemIcon>
        <NavItemText>{props.homeItemLabel || "My Campaigns"}</NavItemText>
      </NavItem>

      <NavDivider isExpanded={props.isExpanded}>
        {props.dividerLabel || ""}
      </NavDivider>
      {props.projects &&
        props.projects.map((project) => (
          <NavItemProject
            key={project.id}
            isExpanded={props.isExpanded}
            isCurrent={nav === project.id}
            onClick={() => setNav(project.id)}
          >
            <NavItemProject.Title
              title={project.title}
              children={project.title}
            />
            <NavItemProject.SubTitle children={project.campaigns} />
          </NavItemProject>
        ))}

      {/* Footer Logo */}
      <NavItem
        isExpanded={props.isExpanded}
        hasBrandmark
        title="Be smart from the start"
        style={{ pointerEvents: "none" }}
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
