import { Body as ZendeskBody } from "@zendeskgarden/react-chrome";
import { BodyArgs } from "./_types";

/**
 * A Body defines the main content of an HTML document which displays on the browser
 */
const Body = (props: BodyArgs) => <ZendeskBody {...props} />;

export { Body };
