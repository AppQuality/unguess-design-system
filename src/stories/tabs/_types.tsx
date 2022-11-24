import { ITabsProps } from "@zendeskgarden/react-tabs";

export interface TabsArgs extends ITabsProps {
  /**
   * Arranges the tabs vertically
   */
  isVertical?: boolean;
  /**
   * Specifies the currently selected tab
   */
  selectedItem?: any;
  /**
   * Handles tab selection
   *
   * @param {String} selectedItem The selected tab's `item` value
   */
}
