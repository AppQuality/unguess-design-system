import { IItemProps, IMenuProps } from "@zendeskgarden/react-dropdowns";

export interface MenuArgs extends IMenuProps {
  /**
   * Allows the menu to reposition during browser resize events
   */
  eventsEnabled?: boolean;
  /**
   * Sets the `z-index` of the menu
   */
  zIndex?: number;
  /**
   * Adjusts the placement of the menu
   */
  placement?:
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
  /**
   * Animates the menu
   */
  isAnimated?: boolean;
  /**
   * Applies compact styling
   */
  isCompact?: boolean;
  /**
   * Attaches an arrow that points towards the menu trigger
   */
  hasArrow?: boolean;
  /**
   * Sets the `max-height` of the menu
   */
  maxHeight?: string;
}

export interface PreviousItemArgs extends IItemProps {
  /** Sets the value that is returned upon selection */
  value: any;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /** Applies danger styling */
  isDanger?: boolean;
}

export interface NextItemArgs extends IItemProps {
  /** Sets the value that is returned upon selection */
  value: any;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /** Applies danger styling */
  isDanger?: boolean;
}
