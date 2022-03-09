import { ITextareaProps } from "@zendeskgarden/react-forms";

export interface TextareaArgs extends ITextareaProps {
  /** Removes borders and padding */
  isBare?: boolean;
  /** Applies inset `box-shadow` styling on focus */
  focusInset?: boolean;
  /** Enables manual vertical resize */
  isResizable?: boolean;
  /** Defines the minimum height in rows */
  minRows?: number;
  /** Defines the maximum height in rows */
  maxRows?: number;
  /** Applies validation state styling */
  validation?: 'success' | 'warning' | 'error';
}