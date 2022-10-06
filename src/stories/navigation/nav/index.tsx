import { Nav as ZendeskNav } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { getColor } from "@zendeskgarden/react-theming";
import { NavArgs } from "./_types";

const UgNav = styled(ZendeskNav)`
  border-right: ${({ theme }) => theme.borders.sm};
  border-color: ${({ theme }) => getColor(theme.colors.neutralHue, 300)};
  transition: all 0.25s ease;
  ${(props) =>
    `
    margin-left: ${
      props.isExpanded
        ? 0
        : -(
            props.theme.components.chrome.nav.openWidth -
            props.theme.components.chrome.nav.closedWidth
          )
    }px;
    width: ${props.theme.components.chrome.nav.openWidth}px;
      
      @media (max-width: ${props.theme.breakpoints.sm}) {
         width: ${props.isExpanded ? "100%" : "0"};
         margin-left: 0;
         border-right: none;
      }
  `}
  // transition: width 0.25s ease-in-out;
  padding-top: ${({ theme }) => theme.space.sm};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
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
