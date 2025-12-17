import { IDrawerProps } from "@zendeskgarden/react-modals";
import { KeyboardEvent, MouseEvent } from "react";

export interface DrawerArgs extends IDrawerProps {
  /**
   * Opens the modal
   */
  isOpen?: boolean;
  /**
   * Passes HTML attributes to the backdrop element
   */
  backdropProps?: any;
  /**
   * Handles close actions. Can be triggered from the backdrop and from the close icon.
   *
   * @param {Object} event The DOM event that triggered the close action
   */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /**
   * Defines the DOM element that the modal will attatch to
   */
  appendToNode?: Element;
  /**
   * Directs keyboard focus to the modal on mount
   */
  focusOnMount?: boolean;
  /**
   * Returns keyboard focus to the element that triggered the modal
   */
  restoreFocus?: boolean;
}
