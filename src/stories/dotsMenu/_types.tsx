import { IMenuProps } from "@zendeskgarden/react-dropdowns";
import { ReactNode } from "react";

export interface IDotsMenu
  extends Omit<IMenuProps, "onChange" | "button" | "onSelect"> {
  children: ReactNode;
  onSelect?: (value?: string) => void;
}
