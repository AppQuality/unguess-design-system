import { IMultiselectProps } from "@zendeskgarden/react-dropdowns";

export interface MultiselectArgs extends IMultiselectProps {
  /** Applies compact styling */
  isCompact?: boolean;
  /** Removes borders and padding */
  isBare?: boolean;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /** Applies inset `box-shadow` styling on focus */
  focusInset?: boolean;
  /** Defines text that appears in the element when no items are selected */
  placeholder?: string;
  /** Defines the element's validation state */
  validation?:  "success" | "warning" | "error";
  /** Determines the maximum number of items displayed while collapsed */
  maxItems?: number;
}