import { Nav as ZendeskNav } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { getColor } from "../../theme/utils";
import { NavArgs } from "./_types";

const UgNav = styled(ZendeskNav)`
  width: ${p => p.isExpanded ? "100%" : "0"};
  padding-top: ${({ theme }) => theme.space.sm};
  margin-left: 0;
  border-right: none;
  transition: all 0.25s ease;
  
  @media (min-width: ${p => p.theme.breakpoints.md}) {
    border-right: ${({ theme }) => theme.borders.sm};
    border-color: ${({ theme }) => getColor(theme.colors.neutralHue, 300)};
    width: ${p => p.theme.components.chrome.nav.openWidth}px;
    margin-left: ${p => p.isExpanded
                        ? 0
                        : -(
                            p.theme.components.chrome.nav.openWidth -
                            p.theme.components.chrome.nav.closedWidth
                          )
    }px;
    padding-left: ${({ theme }) => theme.space.xs};
  }
`;

/**
 * The Nav component provides a high-level layout structure and sets a framework for navigating around dashboards.
 * <br>
 * Used for this:
    - To give a consistent dashboard and navigation experience
 */
const Nav = (props: NavArgs) => <UgNav {...props} />;

export { Nav };
