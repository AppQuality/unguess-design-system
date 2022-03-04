import {
  IButtonProps,
  IButtonStartIconProps,
  IButtonEndIconProps,
} from "@zendeskgarden/react-buttons";

export interface ButtonArgs extends IButtonProps {
  /**
    It's a boolean value that determines whether the button has an icon on the left side.
  */
  hasStartIcon?: boolean;
  /**
    It's a boolean value that determines whether the button has an icon on the right side.
  */
  hasEndIcon?: boolean;
  isStartIconRotated?: boolean;
  isEndIconRotated?: boolean;
  StartIcon?: IButtonStartIconProps;
  EndIcon?: IButtonEndIconProps;
  variant?: string;
}
