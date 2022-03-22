import { INavProps } from "@zendeskgarden/react-chrome";

export interface SidebarArgs extends INavProps {
  /** Expands the nav area to display the item text */
  isExpanded?: boolean;
}