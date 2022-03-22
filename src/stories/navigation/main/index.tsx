import { Main as ZendeskMain } from "@zendeskgarden/react-chrome";
import { MainArgs } from "./_types";

/**
 * A Main defines the main content of an HTML document which displays on the browser
 */
const Main = (props: MainArgs) => <ZendeskMain {...props} />;

export { Main };
