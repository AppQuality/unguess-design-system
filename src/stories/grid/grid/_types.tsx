import {
  IGridProps,
  GRID_NUMBER,
  SPACE,
} from "@zendeskgarden/react-grid";

export interface GridArgs extends IGridProps {
  /** Defines the number of individual columns that the grid contains */
  columns?: GRID_NUMBER;
  /** Specifies the grid column gutter width. The value `false` collapses the gutters */
  gutters?: SPACE;
  /** Highlights the columns for layout debugging */
  debug?: boolean;
}