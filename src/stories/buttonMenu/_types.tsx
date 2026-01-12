import { IMenuProps } from "@zendeskgarden/react-dropdowns";
import { ReactNode } from "react";

export interface ButtonMenuProps
  extends Omit<IMenuProps, "onChange" | "onSelect" | "button"> {
  label: string | IMenuProps["button"];
  children: ReactNode;
  onSelect: (value?: string) => void;
}
