import { ITabsProps } from "@zendeskgarden/react-tabs";

export interface TabsArgs extends ITabsProps {
  /**
   * Arranges the tabs vertically
   */
  isVertical?: boolean;
  /**
   * Specifies the currently selected tab
   */
  selectedItem?: string;
  /**
   * Handles tab selection
   *
   * @param {String} selectedItem The selected tab's `item` value
   */
}

export interface TabsContextType {
  /**
   * Specifies the currently selected tab
   */
  selectedItem?: string;
  /**
   * Handles tab selection
   *
   * @param {String} selectedItem The selected tab's `item` value
   */
  setSelectedItem?: (item: string) => void;
}

export interface CustomTabsArgs extends ITabsProps {
  selectedIndex?: number;
}