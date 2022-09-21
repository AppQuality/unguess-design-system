import { IInputProps } from "@zendeskgarden/react-forms";

export type textSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface InputToggleArgs extends IInputProps {
  /** Removes borders and padding */
  isBare?: boolean;
  /** Applies validation state styling */
  validation?: 'success' | 'warning' | 'error';
  /** Sets input size */
  textSize?: textSizes;
  /** Sets the initial focus */
  isFocused?: boolean;
}