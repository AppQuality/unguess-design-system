import { NavItemIcon as ZendeskNavItemIcon } from "@zendeskgarden/react-chrome";
import { NavItemIconArgs } from "./_types";
import styled from "styled-components";

const UgNavIcon = styled(ZendeskNavItemIcon)<NavItemIconArgs>``;

const NavItemIcon = (props: NavItemIconArgs) => <UgNavIcon {...props} />;

export { NavItemIcon };
