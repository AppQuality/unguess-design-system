import { NavItemText as ZendeskNavItemText } from "@zendeskgarden/react-chrome";
import { Ellipsis } from "../../../typography/ellipsis";
import { NavItemTextArgs } from "./_types";

const NavItemText = (props: NavItemTextArgs) => (
  <ZendeskNavItemText {...props}>
    <Ellipsis style={{ width: "158px" }}>{props.children}</Ellipsis>
  </ZendeskNavItemText>
);

export { NavItemText };
