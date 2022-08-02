import { HTMLAttributes } from "react";

export interface ItemContentArgs extends HTMLAttributes<HTMLDivElement> {
  /** Sets the thumb */
  thumbSrc?: string;
  /** Sets the description */
  description?: string;
  /** Sets the label */
  label?: string;
}
