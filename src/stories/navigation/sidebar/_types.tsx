import { WorkspaceDropdownArgs } from "../header/header-item/_types";
import { NavArgs } from "../nav/_types";

export interface SidebarArgs extends NavArgs, WorkspaceDropdownArgs {
  projects?: Array<ProjectItem>;
  currentRoute?: string;
  homeItemLabel?: string;
  dividerLabel?: string;
  tokens?: string;
  tokensLabel?: string;
  isExpanded?: boolean;
  onToggleMenu?: () => void;
  onNavToggle?: (route: string) => void;
  isLoading?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  campaigns: string;
}