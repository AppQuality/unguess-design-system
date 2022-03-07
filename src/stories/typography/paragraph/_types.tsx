import {
  IParagraphProps,
  ISMProps,
  IMDProps,
  ILGProps,
} from "@zendeskgarden/react-typography";

export interface ParagraphArgs extends IParagraphProps {
  /** Controls the spacing between sibling paragraphs */
  size?: "small" | "medium" | "large";
}

export interface SMArgs extends ISMProps {
  /** Updates the element's HTML tag */
  tag?: any;
  /** Applies bold font style */
  isBold?: boolean;
  /** Renders with monospace font */
  isMonospace?: boolean;
}

export interface MDArgs extends IMDProps {
 /** Updates the element's HTML tag */
 tag?: any;
 /** Applies bold font style */
 isBold?: boolean;
 /** Renders with monospace font */
 isMonospace?: boolean;
}

export interface LGArgs extends ILGProps {
  /** Updates the element's HTML tag */
  tag?: any;
  /** Applies bold font style */
  isBold?: boolean;
  /** Renders with monospace font */
  isMonospace?: boolean;
 }