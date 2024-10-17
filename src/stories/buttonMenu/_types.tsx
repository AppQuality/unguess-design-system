import { IMenuProps } from "@zendeskgarden/react-dropdowns.next";
import { ReactNode } from "react";

export interface ButtonMenuProps
  extends Omit<IMenuProps, "onChange" | "onSelect" | "button"> {
  label: string;
  children: ReactNode;
  onSelect: (value?: string) => void;
}
