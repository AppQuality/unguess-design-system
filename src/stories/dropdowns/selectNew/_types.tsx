import { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";

export interface SelectArgs extends Omit<IComboboxProps, "onSelect"> {
  /** The label*/
  label?: React.ReactNode;
  className?: string;
  /** Sets the style of dropdown item*/
  isPrimary?: boolean;
  children?: React.ReactNode;
  onSelect?: (value: string) => Promise<void> | void;
  isDisabled?: boolean;
}
