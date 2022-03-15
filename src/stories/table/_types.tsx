import { ITableProps, IRowProps, ICellProps, IHeaderCellProps } from "@zendeskgarden/react-tables";
import { SIZE } from "@zendeskgarden/react-tables/dist/typings/styled";

export interface TableProps extends ITableProps {
  /** Sets the table size */
  size?: SIZE;
  /** Removes interactive styling from table rows */
  isReadOnly?: boolean;
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