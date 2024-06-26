import { ISpanProps } from "@zendeskgarden/react-typography";
import { ReactNode } from "react";
import { IBookmark } from "../player/_types";

export interface HighlightArgs {
  /**
   * Applies a font color. Use [PALETTE](/components/palette#palette) colors
   * when possible. Accepts all hex values.
   */
  hue?: string;
  /** Updates the element's HTML tag */
  tag?: any;
  /** Applies bold font style. Font weight is inherited by default. */
  isBold?: boolean;
  /** Renders with monospace font */
  isMonospace?: boolean;
  /** Adjusts the font size. By default font size is medium */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  search?: string;
  onSelectionButtonClick?: (part: { from: number; to: number; text: string }) => void;
  i18n?: {
    selectionButtonLabel: string;
  };
}

export interface Observation extends Omit<IBookmark, "onClick"> {
  color?: string;
}

export interface WordProps extends ISpanProps {
  start: number;
  end: number;
  currentTime?: number;
  observations?: Observation[];
  text: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  tooltipContent?: (observations: Observation[]) => ReactNode;
}
