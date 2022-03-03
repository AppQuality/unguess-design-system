import { IButtonProps, IButtonStartIconProps, IButtonEndIconProps } from "@zendeskgarden/react-buttons";

export interface ButtonArgs extends IButtonProps {
  variant?: string;
  StartIcon?: any;
  EndIcon?: IButtonEndIconProps;
}