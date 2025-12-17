import { IGridProps, SPACE as SPACE_VALUE } from "@zendeskgarden/react-grid";

type SPACE = (typeof SPACE_VALUE)[number];
export interface GridArgs extends IGridProps {
  /** Defines the number of individual columns that the grid contains */
  columns?: number | string;
  /** Specifies the grid column gutter width. The value `false` collapses the gutters */
  gutters?: SPACE;
  /** Highlights the columns for layout debugging */
  debug?: boolean;
}
