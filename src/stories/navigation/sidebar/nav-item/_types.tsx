import { INavItemProps, INavItemTextProps } from "@zendeskgarden/react-chrome";
import { HTMLAttributes, PropsWithChildren } from "react";

export interface NavItemArgs extends INavItemProps {
  /** Indicates that the item is current in the nav */
  isCurrent?: boolean;
  /** Indicates that the item contains a product logo */
  hasLogo?: boolean;
  /** Indicates that the item contains the company brandmark */
  hasBrandmark?: boolean;
}

export interface NavItemTextArgs extends INavItemTextProps {
  /** Wraps overflow item text instead of truncating long strings with an ellipsis **/
  isWrapped?: boolean;
}

export interface NavItemIconArgs
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}
