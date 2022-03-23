import { Nav as ZendeskNav } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { getColor } from "@zendeskgarden/react-theming";
import { NavArgs } from "./_types";

const UgNav = styled(ZendeskNav)`
   border-right: ${({ theme }) => theme.borders.sm};
   border-color: ${({ theme }) => getColor(theme.colors.neutralHue, 300)};
   ${props => !props.isExpanded && `width:  ${props.theme.space.base * 9}px;`}
   transition: width 0.25s ease-in-out;
`;


/**
 * The Nav component provides a high-level layout structure and sets a framework for navigating around dashboards.
 * <br>
 * Used for this:
    - To give a consistent dashboard and navigation experience
 */
const Nav = (props: NavArgs) => <UgNav {...props} />;

export { Nav };
