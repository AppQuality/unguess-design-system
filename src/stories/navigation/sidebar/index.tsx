import { Nav } from "../nav";
import { NavItem, NavItemIcon, NavItemText, NavToggle } from "../nav/nav-item";
import { ReactComponent as ProductIcon } from "@zendeskgarden/svg-icons/src/26/garden.svg";
import { ReactComponent as HomeIcon } from "@zendeskgarden/svg-icons/src/26/home-fill.svg";

import { SidebarArgs } from "./_types";
import { useState } from "react";
import { theme } from "../../theme";
import { Logo } from "../../logo";
import { NavDivider } from "../nav/nav-item/navDivider";
import { NavItemProject } from "../nav/nav-item/navItemProject";

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
  }

  return (
    <Nav {...props}>
      <NavToggle onClick={toggleNav} isExpanded={props.isExpanded} />
      <NavItem hasLogo isExpanded={props.isExpanded} style={{ pointerEvents: "none" }}>
        <NavItemIcon>
          <ProductIcon style={{ color: theme.palette.green[200] }} />
        </NavItemIcon>
        <NavItemText>Zendesk Garden</NavItemText>
      </NavItem>
      <NavItem
        isExpanded={props.isExpanded}
        isCurrent={nav === "home"}
        onClick={() => setNav("home")}
      >
        <NavItemIcon isCurrent={nav === "home"} isStyled>
          <HomeIcon />
        </NavItemIcon>
        <NavItemText>{props.homeItemLabel || "My Campaigns"}</NavItemText>
      </NavItem>

      <NavDivider isExpanded={props.isExpanded}>
        {props.homeItemLabel || "Projects"}
      </NavDivider>
      {props.projects &&
        props.projects.map((project) => (
          <NavItemProject
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
          <Logo type={"icon"} />
        </NavItemIcon>
        <NavItemText>UNGUESS</NavItemText>
      </NavItem>
    </Nav>
  );
};

export { Sidebar };
