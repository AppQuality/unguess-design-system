import {
  IOrderedListProps,
  IUnorderedListProps,
} from "@zendeskgarden/react-typography";

export interface OrderedListArgs extends IOrderedListProps {
  /** Adjusts the vertical spacing between list items */
  size?: "small" | "medium" | "large";
  /** Sets the marker style */
  type?:
    | "decimal"
    | "decimal-leading-zero"
    | "lower-alpha"
    | "lower-roman"
    | "upper-alpha"
    | "upper-roman";
  /** Sets list items */
  items?: string[];
}

export interface UnorderedListArgs extends IUnorderedListProps {
  /** Adjusts the vertical spacing between list items */
  size?: "small" | "medium" | "large";
  /** Sets the marker style */
  type?: "circle" | "disc" | "square";
  /** Sets list items (just for stories) */
  items?: string[];
}
