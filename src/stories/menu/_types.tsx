import { IMenuProps } from "@zendeskgarden/react-dropdowns";

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
  placement?: 'auto' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'end' | 'end-top' | 'end-bottom' | 'start' | 'start-top' | 'start-bottom';
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
