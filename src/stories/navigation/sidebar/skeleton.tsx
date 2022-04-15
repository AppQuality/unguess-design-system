import { Skeleton } from "../../loaders/skeleton";
import { Nav } from "../nav";
import {
  NavItem,
  NavItemIcon,
  NavItemText,
  NavToggle,
  NavDivider,
  NavItemProject,
} from "../nav/nav-item";

export const LoadingSidebar = () => {
  const isExpanded = true;

  return (
    <Nav style={{ width: "250px" }}>
      <NavToggle isExpanded={isExpanded} />

      <NavItem isExpanded={isExpanded} isCurrent={true}>
        <NavItemIcon isStyled>
          <Skeleton
            width="32px"
            height="32px"
            style={{ borderRadius: "100%" }}
          />
        </NavItemIcon>
        <Skeleton height="12px" width="60%" />
        <NavItemText></NavItemText>
      </NavItem>

      <NavDivider isExpanded={isExpanded} />

      <NavItemProject key={1} isExpanded={isExpanded} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: "6px" }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      <NavItemProject key={2} isExpanded={isExpanded} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: "6px" }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      <NavItemProject key={3} isExpanded={isExpanded} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: "6px" }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      <NavItemProject key={3} isExpanded={isExpanded} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: "6px" }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      {/* Footer Logo */}
      <NavItem
        isExpanded={isExpanded}
        hasBrandmark
        title="Be smart from the start"
        style={{ pointerEvents: "none" }}
      >
        <NavItemIcon>
          <Skeleton
            width="32px"
            height="32px"
            style={{ borderRadius: "100%" }}
          />
        </NavItemIcon>
        <NavItemText>UNGUESS</NavItemText>
      </NavItem>
    </Nav>
  );
};
