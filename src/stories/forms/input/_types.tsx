import { IInputProps } from "@zendeskgarden/react-forms";

export interface InputArgs extends IInputProps {
  /** Removes borders and padding */
  isBare?: boolean;
  /** Applies inset `box-shadow` styling on focus */
  focusInset?: boolean;
  /** Applies validation state styling */
  validation?: 'success' | 'warning' | 'error';
}