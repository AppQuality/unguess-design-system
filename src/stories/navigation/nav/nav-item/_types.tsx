import { INavItemProps, INavItemTextProps } from "@zendeskgarden/react-chrome";
import { HTMLAttributes, PropsWithChildren } from "react";
import { LabelArgs } from "../../../label/_types";

export interface NavItemArgs extends INavItemProps {
  /** Indicates that the item is current in the nav */
  isCurrent?: boolean;
  /** Indicates that the item contains a product logo */
  hasLogo?: boolean;
  /** Indicates that the item contains the company brandmark */
  hasBrandmark?: boolean;
  /** Expands the nav area to display the item text */
  isExpanded?: boolean;
}

export interface NavItemTextArgs extends INavItemTextProps {
  /** Wraps overflow item text instead of truncating long strings with an ellipsis **/
  isWrapped?: boolean;
}

export interface NavItemIconArgs
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  /** Indicates that the item is current in the nav */
  isCurrent?: boolean;
  /** Indicates that the item has a gradient style when selected */
  isStyled?: boolean;
}
export interface NavToggleArgs extends NavItemIconArgs {
  /** Expands the nav area to display the item text */
  isExpanded?: boolean;
}


export interface NavDividerArgs extends LabelArgs {}