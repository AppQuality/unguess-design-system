import { TooltipModalArgs } from "./_types";
import { TooltipModal as ZendeskTooltipModal } from "@zendeskgarden/react-modals";

/**
 * A Tooltip modal provides contextual information about a paired element. It either opens automatically or through user action.
 * <hr>
 * Used for this:
    - To enable user action within a tooltip
    - To provide a focus loop when actions need to be inside a tooltip
 */


const TooltipModal = (props: TooltipModalArgs) => <ZendeskTooltipModal {...props} />;

TooltipModal.Title = ZendeskTooltipModal.Title;
TooltipModal.Body = ZendeskTooltipModal.Body;
TooltipModal.Close = ZendeskTooltipModal.Close;
TooltipModal.Footer = ZendeskTooltipModal.Footer;
TooltipModal.FooterItem = ZendeskTooltipModal.FooterItem;

export { TooltipModal };
