import {
  IBlockquoteProps
} from "@zendeskgarden/react-typography";

export interface BlockquoteArgs extends IBlockquoteProps {
  /** Controls the spacing between sibling blockquotes */
  size?: 'small' | 'medium' | 'large';
}