import { ITabsProps } from "@zendeskgarden/react-tabs";

export interface TabsArgs extends ITabsProps {
  selectedIndex?: number;

  onTabChange?: (index: number) => void;
}

export interface TabItemProps {
  children: React.ReactNode;
  index: number;
  isSelected?: boolean;
  isDisabled?: boolean;
  setSelectedTab: (index: number) => void;
}

export interface TabPanelProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  title: string;
}