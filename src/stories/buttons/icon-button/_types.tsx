import { IIconButtonProps } from "@zendeskgarden/react-buttons";

export interface IconButtonArgs extends IIconButtonProps {
  /** Applies neutral button styling */
  isNeutral?: boolean;
  /** Applies bright styling, used for dark interfaces */
  isBright?: boolean;
  /** Applies primary button styling */
  isPrimary?: boolean;
  /** Applies danger button styling */
  isDanger?: boolean;
  /** Applies basic button styling */
  isBasic?: boolean;
  /** Applies pill button styling */
  isPill?: boolean;
  /** Applies inset `box-shadow` styling on focus */
  focusInset?: boolean;
  /** Rotates icon 180 degrees */
  isRotated?: boolean;
  /** Specifies icon button size */
  size?: "small" | "medium" | "large";
}
