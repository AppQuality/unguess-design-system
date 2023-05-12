import { IAnchorProps, Anchor as ZendeskAnchor } from "@zendeskgarden/react-buttons";
import { forwardRef } from "react";

/**
 * The Anchor is a link that helps users navigate from one location to another.
 * <hr>
 * Used for this:
    - To navigate from one page to another
    - To navigate within a page
    - To display links alongside text 
 */
const Anchor = forwardRef<HTMLAnchorElement, IAnchorProps>((props, ref) => <ZendeskAnchor ref={ref} {...props} />);

export { Anchor };
