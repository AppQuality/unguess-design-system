import { Chrome as ZendeskChrome } from "@zendeskgarden/react-chrome";
import { ChromeArgs } from "./_types";

/**
 * The Chrome component provides a high-level layout structure and sets a framework for navigating around Zendesk products.
 * <br>
 * Used for this:
    - To give a consistent dashboard and navigation experience
 */
const Chrome = (props: ChromeArgs) => <ZendeskChrome {...props} />;

export { Chrome };
