import { NavArgs } from "../nav/_types";

export interface SidebarArgs extends NavArgs {
  projects?: Array<ProjectItem>;
  currentRoute?: string;
  homeItemLabel?: string;
  tokens?: number;
}

export interface ProjectItem {
  id: number;
  title: string;
  campaigns: number;
}