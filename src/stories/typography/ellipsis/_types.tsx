import { IEllipsisProps } from "@zendeskgarden/react-typography";

export interface EllipsisArgs extends IEllipsisProps {
  /** Overrides the auto-generated `title` attribute */
  title?: string;
  /** Updates the element's HTML tag */
  tag?: any;
  /** Controls the element width */
  width?: number;
}
