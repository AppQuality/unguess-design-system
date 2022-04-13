import { IDropdownProps, ISelectProps, IMessageProps } from "@zendeskgarden/react-dropdowns";

export interface DropdownArgs extends IDropdownProps {
  /** Opens the dropdown */
  isOpen?: boolean;
  /** Identifies the currently selected item */
  selectedItem?: any;
  /** Identifies the currently selected items */
  selectedItems?: any[];
  /** Highlights an element at a selected index */
  highlightedIndex?: number;
  /** Sets the value of the input element*/
  inputValue?: string;
}

export interface SelectArgs extends ISelectProps {
  /** Applies compact styling */
  isCompact?: boolean;
  /** Removes borders and padding */
  isBare?: boolean;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /** Applies inset `box-shadow` styling on focus */
  focusInset?: boolean;
  /** Defines the element's validation state */
  validation?: 'success' | 'warning' | 'error';
  /** Defines the icon rendered before the element's content */
  start?: any;
  /** Sets the style of dropdown item*/
  isPrimary?: boolean;
}

export interface MessageArgs extends IMessageProps {
  /** Applies styles based on validation state */
  validation?: 'success' | 'warning' | 'error';
}
