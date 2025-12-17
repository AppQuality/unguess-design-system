import {
  ALIGN_SELF as ALIGN_SELF_VALUE,
  IColProps,
  TEXT_ALIGN as TEXT_ALIGN_VALUE,
} from "@zendeskgarden/react-grid";

type GRID_NUMBER = number | string;
type BREAKPOINT = number | string | boolean;
type ALIGN_SELF = (typeof ALIGN_SELF_VALUE)[number];
type TEXT_ALIGN = (typeof TEXT_ALIGN_VALUE)[number];
export interface ColArgs extends IColProps {
  /** Sets the total number of grid `columns` that the column spans on all screen sizes */
  size?: GRID_NUMBER;
  /** Defines the column size on extra-small screens.
   *  See [breakpoints](/components/theme-object#default_theme).
   */
  xs?: BREAKPOINT;
  /** Defines the column size on small screens*/
  sm?: BREAKPOINT;
  /** Defines the column size on medium screens */
  md?: BREAKPOINT;
  /** Defines the column size on large screens */
  lg?: BREAKPOINT;
  /** Defines the column size on extra-large screens */
  xl?: BREAKPOINT;
  /**
   * Applies the `align-self` flex item property, overriding `Row alignItems`
   * vertical alignment on all screen sizes
   */
  alignSelf?: ALIGN_SELF;
  /** Applies the `align-self` flex item property to the column on extra-small screens */
  alignSelfXs?: ALIGN_SELF;
  /** Applies the `align-self` flex item property to the column on small screens */
  alignSelfSm?: ALIGN_SELF;
  /** Applies the `align-self` flex item property to the column on medium screens */
  alignSelfMd?: ALIGN_SELF;
  /** Applies the `align-self` flex item property to the column on large screens */
  alignSelfLg?: ALIGN_SELF;
  /** Applies the `align-self` flex item property to the column on extra-large screens */
  alignSelfXl?: ALIGN_SELF;
  /**
   * Applies the RTL-aware `text-align` property to the column on all screen sizes
   */
  textAlign?: TEXT_ALIGN;
  /** Applies the `text-align` property to the column on extra-small screens */
  textAlignXs?: TEXT_ALIGN;
  /** Applies the `text-align` property to the column on small screens */
  textAlignSm?: TEXT_ALIGN;
  /** Applies the `text-align` property to the column on medium screens */
  textAlignMd?: TEXT_ALIGN;
  /** Applies the `text-align` property to the column on large screens */
  textAlignLg?: TEXT_ALIGN;
  /** Applies the `text-align` property to the column on extra-large screens */
  textAlignXl?: TEXT_ALIGN;
  /**
   * Offsets the column relative to the total number of `columns` in the
   * grid on all screen sizes
   */
  offset?: GRID_NUMBER;
  /** Applies offset to the column on extra-small screens */
  offsetXs?: GRID_NUMBER;
  /** Applies offset to the column on small screens */
  offsetSm?: GRID_NUMBER;
  /** Applies offset to the column on medium screens */
  offsetMd?: GRID_NUMBER;
  /** Applies offset to the column on large screens */
  offsetLg?: GRID_NUMBER;
  /** Applies offset to the column on extra-large screens */
  offsetXl?: GRID_NUMBER;
  /**
   * Applies the `order` flex item property to the column on all screen sizes. Note that
   * order modification can introduce accessibility problems by
   * confusing tab ordering. Rely on semantic DOM ordering whenever possible.
   */
  order?: GRID_NUMBER;
  /** Sets the `order` flex item property of the column on extra-small screens */
  orderXs?: GRID_NUMBER;
  /** Sets the `order` flex item property of the column on small screens */
  orderSm?: GRID_NUMBER;
  /** Sets the `order` flex item property of the column on medium screens */
  orderMd?: GRID_NUMBER;
  /** Sets the `order` flex item property of the column on large screens */
  orderLg?: GRID_NUMBER;
  /** Sets the `order` flex item property of the column on extra-large screens */
  orderXl?: GRID_NUMBER;
}
