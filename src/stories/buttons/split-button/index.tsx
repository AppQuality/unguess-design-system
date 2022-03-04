import { SplitButton as ZendeskSplitButton } from "@zendeskgarden/react-buttons";
import { SplitButtonArgs } from "./_types";

/**
Icon buttons (like Buttons) let users take action. 
They are used for repeated or persistent actions on a page and lack visible labels to simplify the UI.
<br>
Do this: <b>Include a Tooltip to help any users who may be unfamiliar with the icon.</b>
<hr>
Used for this
 - To simplify the appearance of repeated or persistent actions on a page 
 - To enable action in a toolbar
**/
const SplitButton = (props: SplitButtonArgs) => (
  <ZendeskSplitButton {...props} />
);

export { SplitButton };
