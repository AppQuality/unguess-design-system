import { IInputProps } from "@zendeskgarden/react-forms";

export interface InputToggleArgs extends IInputProps {
  /** Removes borders and padding */
  isBare?: boolean;
  /** Applies validation state styling */
  validation?: 'success' | 'warning' | 'error';
  /** Sets input size */
  size?: number;
  /** Sets the initial focus */
  isFocused?: boolean;
}