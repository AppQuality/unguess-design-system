import {
  IRowProps,
  ALIGN_ITEMS,
  JUSTIFY_CONTENT,
  WRAP,
} from "@zendeskgarden/react-grid";

export interface RowArgs extends IRowProps {
  /**
   * Applies the `align-items` flex container property to the row.
   * This affects vertical `Col` alignment on all screen sizes.
   */
  alignItems?: ALIGN_ITEMS;
  /** Applies the `align-items` flex container property to the row on extra-small screens */
  alignItemsXs?: ALIGN_ITEMS;
  /** Applies the `align-items` flex container property to the row on small screens */
  alignItemsSm?: ALIGN_ITEMS;
  /** Applies the `align-items` flex container property to the row on medium screens */
  alignItemsMd?: ALIGN_ITEMS;
  /** Applies the `align-items` flex container property to the row on large screens */
  alignItemsLg?: ALIGN_ITEMS;
  /** Applies the `align-items` flex container property to the row on extra-large screens */
  alignItemsXl?: ALIGN_ITEMS;
  /**
   * Applies the `justify-content` flex container property to the row.
   * This affects horizontal `Col` alignment on all screen sizes.
   */
  justifyContent?: JUSTIFY_CONTENT;
  /** Applies the `justify-content` flex container property to the row on extra-small screens */
  justifyContentXs?: JUSTIFY_CONTENT;
  /** Applies the `justify-content` flex container property to the row on small screens */
  justifyContentSm?: JUSTIFY_CONTENT;
  /** Applies the `justify-content` flex container property to the row on medium screens */
  justifyContentMd?: JUSTIFY_CONTENT;
  /** Applies the `justify-content` flex container property to the row on large screens */
  justifyContentLg?: JUSTIFY_CONTENT;
  /** Applies the `justify-content` flex container property to the row on extra-large screens */
  justifyContentXl?: JUSTIFY_CONTENT;
  /**
   * Applies the `flex-wrap` container property to the row. This affects `Col` wrapping on
   * all screen sizes.
   */
  wrap?: WRAP;
  /** Applies the `flex-wrap` container property to the row on extra-small screens */
  wrapXs?: WRAP;
  /** Applies the `flex-wrap` container property to the row on small screens */
  wrapSm?: WRAP;
  /** Applies the `flex-wrap` container property to the row on medium screens */
  wrapMd?: WRAP;
  /** Applies the `flex-wrap` container property to the row on large screens */
  wrapLg?: WRAP;
  /** Applies the `flex-wrap` container property to the row on extra-large screens */
  wrapXl?: WRAP;
}
