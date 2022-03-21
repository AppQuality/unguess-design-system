import { Body as ZendeskBody } from "@zendeskgarden/react-chrome";
import { BodyProps } from "./_types";

/**
 * A Body defines the main content of an HTML document which displays on the browser
 */
const Body = (props: BodyProps) => <ZendeskBody {...props} />;

export { Body };
