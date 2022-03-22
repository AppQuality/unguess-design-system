import { Nav as ZendeskNav } from "@zendeskgarden/react-chrome";
import { NavArgs } from "./_types";

/**
 * The Sidebar component provides a high-level layout structure and sets a framework for navigating around dashboards.
 * <br>
 * Used for this:
    - To give a consistent dashboard and navigation experience
 */
const Sidebar = (props: NavArgs) => <ZendeskNav {...props} />;

export { Sidebar };
