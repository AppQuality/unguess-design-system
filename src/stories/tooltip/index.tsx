import { Tooltip as ZendeskTooltip } from "@zendeskgarden/react-tooltips";
import { TooltipArgs } from "./_types";

/**
 * Tooltips appear when a user hovers or focuses an element. They provide contextual information about the element they are paired with.
 * <hr>
 * Used for this:
 *    - To describe the function of an element when it might be ambiguous
 *    - To describe the function of unlabeled icons
 * Not for this:
 *    - To provide information a user needs to know or remember
 *    - To display truncated text, use a title attribute instead
 */
const Tooltip = (props: TooltipArgs) => <ZendeskTooltip {...props} />;

export { Tooltip };
