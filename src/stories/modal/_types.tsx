import { IModalProps } from '@zendeskgarden/react-modals';
import { KeyboardEvent, MouseEvent, ReactElement } from "react";

export interface ModalArgs extends IModalProps {
  /**
   * Handles close actions. Can be triggered from the backdrop and from the close icon.
   * @param {Object} event The DOM event that triggered the close action
   */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /**
   * Handles confirm actions.
   *
   * @param {Object} event The DOM event that triggered the close action
   */
  onConfirm?: (event: KeyboardEvent | MouseEvent) => void;
  /**
   * Handles cancel actions.
   *
   * @param {Object} event The DOM event that triggered the close action
   */
  onCancel?: (event: KeyboardEvent | MouseEvent) => void;
  /**
   * Applies large styling
   */
  isLarge?: boolean;
  /**
   * Applies danger styling
   */
  isDanger?: boolean
  /**
   * Confirm button text
   */
  confirmText?: string
  /**
   * Cancel button text
   */
  cancelText?: string
  /**
   * Body content text
   */
  content: string
  /**
   * Is open or not
   */
  open: boolean
  /**
   * Title text
   */
  title: string
  /**
   * Renders a custom HTML element in the modal
   */
  customContent?: ReactElement
}