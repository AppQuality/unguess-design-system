import { ISpanProps } from "@zendeskgarden/react-typography";

export interface SpanArgs extends ISpanProps {
  /** Applies bold font style. Font weight is inherited by default. */
  isBold?: boolean;
  /** Renders with monospace font */
  isMonospace?: boolean;
  /**
   * Applies a font color. Use
   * [PALETTE](/components/palette#palette)
   * colors when possible. Accepts all hex values.
   */
  hue?: string;
}
