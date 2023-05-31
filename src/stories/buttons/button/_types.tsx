import { IButtonProps } from "@zendeskgarden/react-buttons";

export interface ButtonArgs extends IButtonProps {
  /** Applies bright styling, used for dark interfaces */
  isBright?: boolean;
  /** Applies accent button styling */
  isAccent?: boolean;
}
