import { NavArgs } from "../nav/_types";

export interface SidebarArgs extends NavArgs {
  projects?: Array<ProjectItem>;
  currentRoute?: string;
  homeItemLabel?: string;
  dividerLabel?: string;
  tokens?: number;
  isExpanded?: boolean;
  onToggleMenu?: () => void;
}

export interface ProjectItem {
  id: string;
  title: string;
  campaigns: string;
}