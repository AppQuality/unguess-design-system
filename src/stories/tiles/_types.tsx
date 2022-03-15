import { ChangeEventHandler } from "react";
import { ITilesProps } from "@zendeskgarden/react-forms";

export interface TilesArgs extends ITilesProps {
  /** Sets the value of the selected radio button */
  value?: string;
  /** Handles radio selection */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Sets the name used to reference the value of the control */
  name: string;
  /** Centers tile content */
  isCentered?: boolean;
}