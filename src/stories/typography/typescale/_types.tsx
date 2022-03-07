import {
  ISMProps,
  IMDProps,
  ILGProps,
  IXLProps,
  IXXLProps,
  IXXXLProps,
} from "@zendeskgarden/react-typography";

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

 export interface XLArgs extends IXLProps {
  /** Updates the element's HTML tag */
  tag?: any;
  /** Applies bold font style */
  isBold?: boolean;
 }

 export interface XXLArgs extends IXXLProps {
  /** Updates the element's HTML tag */
  tag?: any;
  /** Applies bold font style */
  isBold?: boolean;
 }

 export interface XXXLArgs extends IXXXLProps {
  /** Updates the element's HTML tag */
  tag?: any;
  /** Applies bold font style */
  isBold?: boolean;
 }