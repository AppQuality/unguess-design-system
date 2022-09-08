import { TooltipModalArgs } from "./_types";
import { TooltipModal as ZendeskTooltipModal } from "@zendeskgarden/react-modals";
import styled from "styled-components";

const StyledTooltipModal = styled(ZendeskTooltipModal)`
   border-radius: ${({ theme }) => theme.borderRadii.md};
`;

/**
 * A Tooltip modal provides contextual information about a paired element. It either opens automatically or through user action.
 * <hr>
 * Used for this:
    - To enable user action within a tooltip
    - To provide a focus loop when actions need to be inside a tooltip
 */


const TooltipModal = (props: TooltipModalArgs) => <StyledTooltipModal {...props} />;

TooltipModal.Title = StyledTooltipModal.Title;
TooltipModal.Body = StyledTooltipModal.Body;
TooltipModal.Close = StyledTooltipModal.Close;
TooltipModal.Footer = StyledTooltipModal.Footer;
TooltipModal.FooterItem = StyledTooltipModal.FooterItem;

export { TooltipModal };
