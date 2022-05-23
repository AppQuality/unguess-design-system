import { WorkspaceDropdownArgs } from "../header/header-item/_types";
import { NavArgs } from "../nav/_types";
export interface ProjectItem {
  id: string;
  title: string;
  campaigns: string;
}

export interface FeatureItem {
  slug: string;
  name: string;
}

export interface SidebarArgs extends NavArgs, WorkspaceDropdownArgs {
  projects?: Array<ProjectItem>;
  currentRoute?: string;
  homeItemLabel?: string;
  servicesItemLabel?: string;
  dividerLabel?: string;
  tokens?: string;
  tokensLabel?: string;
  isExpanded?: boolean;
  onToggleMenu?: () => void;
  onNavToggle?: (route: string, parameter?: string) => void;
  isLoading?: boolean;
  features?: Array<FeatureItem>;
}