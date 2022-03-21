import { Content as ZendeskContent } from "@zendeskgarden/react-chrome";
import { ContentProps } from "./_types";

/**
 * A Content defines the main content of an HTML document which displays on the browser
 */
const Content = (props: ContentProps) => <ZendeskContent {...props} />;

export { Content };
