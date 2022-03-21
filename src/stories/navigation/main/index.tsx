import { Main as ZendeskMain } from "@zendeskgarden/react-chrome";
import { MainProps } from "./_types";

/**
 * A Main defines the main content of an HTML document which displays on the browser
 */
const Main = (props: MainProps) => <ZendeskMain {...props} />;

export { Main };
