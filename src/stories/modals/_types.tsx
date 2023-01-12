import { IModalProps } from "@zendeskgarden/react-modals";
import { KeyboardEvent, MouseEvent } from "react";

export interface ModalArgs extends IModalProps {
  /**
   * Handles close actions. Can be triggered from the backdrop and from the close icon.
   *
   * @param {Object} event The DOM event that triggered the close action
   */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /**
   * Centers the modal on the backdrop
   */
  isCentered?: boolean;
  /**
   * Animates the modal
   */
  isAnimated?: boolean;
  /**
   * Defines the DOM element that the modal will attatch to
   */
  appendToNode?: Element;
  /**
   * Applies large styling
   */
  isLarge?: boolean;
  
  /**
   * Applies Extra-large styling
   */
  isExtraLarge?: boolean;

  /**
   * Directs keyboard focus to the modal on mount
   */
  focusOnMount?: boolean;
  /**
   * Returns keyboard focus to the element that triggered the modal
   */
  restoreFocus?: boolean;
}
