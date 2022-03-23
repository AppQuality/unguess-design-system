import styled from "styled-components";
import { Nav } from "../nav";
import { NavItem, NavItemIcon, NavItemText, NavToggle } from "../nav/nav-item";
import { ReactComponent as ProductIcon } from "@zendeskgarden/svg-icons/src/26/garden.svg";
import { ReactComponent as HomeIcon } from "@zendeskgarden/svg-icons/src/26/home-fill.svg";
import { ReactComponent as EmailIcon } from "@zendeskgarden/svg-icons/src/26/email-fill.svg";
import { ReactComponent as SettingsIcon } from "@zendeskgarden/svg-icons/src/26/settings-fill.svg";

import { SidebarArgs } from "./_types";
import { useState } from "react";
import { theme } from "../../theme";
import { Logo } from "../../logo";
import { NavDivider } from "../nav/nav-item/navDivider";

/**
 * The UNGUESS Sidebar component provides a high-level layout structure and sets a framework for navigating around projects.
 * <br>
 * Used for this:
    - To give a consistent dashboard and navigation experience
 */
const Sidebar = (props: SidebarArgs) => {
  const [nav, setNav] = useState(props.currentRoute || "home");
  const [expanded, setExpanded] = useState(false);
  return (
    <Nav {...props} isExpanded={expanded}>
      <NavToggle onClick={() => setExpanded(!expanded)} isExpanded={expanded} />
      <NavItem hasLogo isExpanded={expanded} style={{ pointerEvents: "none" }}>
        <NavItemIcon>
          <ProductIcon style={{ color: theme.palette.green[200] }} />
        </NavItemIcon>
        <NavItemText>Zendesk Garden</NavItemText>
      </NavItem>
      <NavItem
        isExpanded={expanded}
        isCurrent={nav === "home"}
        onClick={() => setNav("home")}
      >
        <NavItemIcon isCurrent={nav === "home"} isStyled>
          <HomeIcon />
        </NavItemIcon>
        <NavItemText>{props.homeItemLabel || "My Campaigns"}</NavItemText>
      </NavItem>

      <NavDivider isExpanded={expanded}>Projects</NavDivider>

      {/* Footer Logo */}
      <NavItem
        isExpanded={expanded}
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
