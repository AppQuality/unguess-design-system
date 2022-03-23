import { NavItemIcon as ZendeskNavItemIcon } from "@zendeskgarden/react-chrome";
import { NavItemIconArgs } from "./_types";
import styled from "styled-components";

const UgNavIcon = styled(ZendeskNavItemIcon)<NavItemIconArgs>`
  ${(props) =>
    props.isStyled &&
    props.isCurrent &&
    ` svg {
       fill: ${props.theme.gradients.horizontal};
    }`}
`;

const NavItemIcon = (props: NavItemIconArgs) => <UgNavIcon {...props} />;

export { NavItemIcon };
