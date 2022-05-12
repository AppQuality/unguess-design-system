import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import {
  IHeaderItemProps,
  IHeaderItemTextProps,
} from "@zendeskgarden/react-chrome";

export interface Workspace {
  id: number;
  name: string;
}

export interface HeaderItemArgs extends IHeaderItemProps {
  /** Maximizes the width of a flex item in the header */
  maxX?: boolean;
  /** Maximizes the height of the item (i.e. contains a search input) */
  maxY?: boolean;
  /** Rounds the border radius of the item */
  isRound?: boolean;
  /** Applies header logo styles to the item */
  hasLogo?: boolean;
}

export interface BrandItemArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Maximizes the width of a flex item in the header */
  maxX?: boolean;
  /** Maximizes the height of the item (i.e. contains a search input) */
  maxY?: boolean;
  /** Rounds the border radius of the item */
  isRound?: boolean;
  /** Display a brand identity name */
  brandName?: string;
  /** Add a descriptive text to the menu item icon*/
  menuLabel?: string;

  workspacesLabel?: string;

  activeWorkspace?: Workspace;

  workspaces?: Workspace[];

  onWorkspaceChange?: (workspace: Workspace) => void;

  /** Triggered when the menu item is clicked */
  toggleMenu?: () => void;
}

export interface HeaderItemTextArgs extends IHeaderItemTextProps {
  /** Hides item text. Text remains accessible to screen readers. */
  isClipped?: boolean;
}

export interface HeaderItemIconArgs extends HTMLAttributes<HTMLDivElement> {}

export interface HeaderItemWrapperArgs extends HTMLAttributes<HTMLDivElement> {}
