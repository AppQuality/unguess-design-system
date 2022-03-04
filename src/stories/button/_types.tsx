import { IButtonProps, IButtonStartIconProps, IButtonEndIconProps } from "@zendeskgarden/react-buttons";

export interface ButtonArgs extends IButtonProps {
  hasStartIcon?: boolean,
  hasEndIcon?: boolean,
  isStartIconRotated?: boolean,
  isEndIconRotated?: boolean,
  StartIcon?: IButtonStartIconProps;
  EndIcon?: IButtonEndIconProps;
  variant?: string;
}