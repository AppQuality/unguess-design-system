import { ITooltipModalProps } from "@zendeskgarden/react-modals";
type Placement =
  | "auto"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "end"
  | "end-top"
  | "end-bottom"
  | "start"
  | "start-top"
  | "start-bottom";

export interface TooltipModalArgs extends ITooltipModalProps {
  /**
   * Positions the modal relative to the provided `HTMLElement`
   */
  referenceElement?: HTMLElement | null;
  /**
   * Adjusts the placement of the tooltip
   **/
  placement?: Placement;
  /**
   * Adds an arrow to the tooltop
   */
  hasArrow?: boolean;
  /**
   * Sets the `z-index` of the tooltip
   */
  zIndex?: number;
}
