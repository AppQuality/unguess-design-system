import {
  IParagraphProps
} from "@zendeskgarden/react-typography";

export interface ParagraphArgs extends IParagraphProps {
  /** Controls the spacing between sibling paragraphs */
  size?: "small" | "medium" | "large";
}
