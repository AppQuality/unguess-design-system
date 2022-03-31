import {
  ITableProps,
  IRowProps,
  ICellProps,
  IHeaderCellProps,
  ISortableCellProps,
} from "@zendeskgarden/react-tables";
import { SIZE, SORT } from "@zendeskgarden/react-tables/dist/typings/styled";
import { IconArgs } from "../icons/_types";

export interface TableProps extends ITableProps {
  /** Sets the table size */
  size?: SIZE;
  /** Removes interactive styling from table rows */
  isReadOnly?: boolean;

  columns?: Array<{ name: string; field: string }>;
  items?: Array<IRow>;
  groups?: Array<Group> | null;
  isStriped?: boolean;
  hasCaption?: boolean;
  isTruncated?: boolean;
}

export interface HeaderCellArgs extends IHeaderCellProps {
  /** Applies striped styling */
  isStriped?: boolean;
  /** @ignore Applies focus styling */
  isFocused?: boolean;
  /** @ignore Applies hover styling */
  isHovered?: boolean;
  /** Applies selected styling */
  isSelected?: boolean;
}

export interface RowArgs extends IRowProps {
  /** Applies striped styling */
  isStriped?: boolean;
  /** @ignore Applies focus styling */
  isFocused?: boolean;
  /** @ignore Applies hover styling */
  isHovered?: boolean;
  /** Applies selected styling */
  isSelected?: boolean;
}

export interface CellArgs extends ICellProps {
  /**
   * Applies minimum fixed width styling (e.g. for cells that contain
   * checkboxes or icons)
   */
  isMinimum?: boolean;
  /** Truncates long text with an ellipsis */
  isTruncated?: boolean;
  /** Applies styling for a cell that contains an overflow menu */
  hasOverflow?: boolean;
  /** Adjusts the [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) of the cell */
  width?: string | number;
}

export interface HeadArgs extends ICellProps {
  /**
   * Applies minimum fixed width styling (e.g. for cells that contain
   * checkboxes or icons)
   */
  isMinimum?: boolean;
  /** Truncates long text with an ellipsis */
  isTruncated?: boolean;
  /** Applies styling for a cell that contains an overflow menu */
  hasOverflow?: boolean;
  /** Adjusts the [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) of the cell */
  width?: string | number;
}

export interface SortableCellArgs extends ISortableCellProps {
  /** Sets the sort order */
  sort?: SORT;
  /** Sets the width of the cell */
  width?: string | number;
  /** Passes props to the cell */
  cellProps?: any;
}

export interface IRow {
  id?: number | string;
  groupName?: string;
  selected?: boolean;
  [index: string]: any;
}

export interface Group {
  groupName: string;
  groupIcon: IconArgs["type"];
  items: Array<IRow>;
}
