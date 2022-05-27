import { IWellProps } from "@zendeskgarden/react-notifications";

export interface CardProps extends IWellProps {
  /** Applies a background color */
  isRecessed?: boolean;
  /** Applies a drop shadow */
  isFloating?: boolean;
}

export interface ContainerCardProps extends IWellProps {
  /** Applies a background color */
  isRecessed?: boolean;
}
