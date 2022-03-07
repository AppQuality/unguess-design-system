import { ICodeProps } from "@zendeskgarden/react-typography";

export interface CodeArgs extends ICodeProps {
  /** Applies color to the background and the text */
  hue?: "grey" | "red" | "green" | "yellow";
  /** Adjusts the font size. By default font size is inherited from the surrounding text. */
  size?: "small" | "medium" | "large" | "inherit";
}
