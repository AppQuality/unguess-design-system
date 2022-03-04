import { IButtonProps } from "@zendeskgarden/react-buttons";

export interface ButtonArgs extends IButtonProps {
  /**
    It's a boolean value that determines whether the button has an icon on the left side.
    @default false
  */
  hasStartIcon?: boolean;
  /**
    It's a boolean value that determines whether the button has an icon on the right side.
    @default false
  */
  hasEndIcon?: boolean;
  isStartIconRotated?: boolean;
  isEndIconRotated?: boolean;
  /**
   Definine the button variations, possible values are: {isDefault},
   {isBasic},{isPrimary}, {isLink}
      
   @default isDefault
   */
  variant?: string;
}
