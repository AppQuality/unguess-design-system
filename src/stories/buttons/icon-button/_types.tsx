import { IIconButtonProps } from "@zendeskgarden/react-buttons";

export interface IconButtonArgs extends IIconButtonProps {
  /** Applies bright styling, used for dark interfaces */
  isBright?: boolean;
  /** Applies accent button styling */
  isAccent?: boolean;
}
