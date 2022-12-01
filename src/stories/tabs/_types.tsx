import { HTMLAttributes } from "react";

export interface TabsArgs extends HTMLAttributes<HTMLDivElement> {
  selectedIndex?: number;

  onTabChange?: (index: number) => void;
}

export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index: number;
  isSelected?: boolean;
  isDisabled?: boolean;
  setSelectedTab: (index: number) => void;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isDisabled?: boolean;
  title: string;
  hidden?: boolean;
}
