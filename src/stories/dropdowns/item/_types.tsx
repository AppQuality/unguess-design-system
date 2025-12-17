import { IItemProps } from "@zendeskgarden/react-dropdowns";

export interface ItemArgs extends IItemProps {
  /** Sets the value that is returned upon selection */
  value: any;
  /** Indicates that the element is not interactive */
  disabled?: boolean;
  /** Applies danger styling */
  isDanger?: boolean;
}
