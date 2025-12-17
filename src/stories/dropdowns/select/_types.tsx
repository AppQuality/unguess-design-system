import { IComboboxProps } from "@zendeskgarden/react-dropdowns";

export interface SelectArgs extends Omit<IComboboxProps, "onSelect"> {
  /** The label*/
  label?: React.ReactNode;
  className?: string;
  /** Sets the style of dropdown item*/
  isPrimary?: boolean;
  children?: React.ReactNode;
  onSelect?: (value: string) => Promise<void> | void;
  isDisabled?: boolean;
  fullWidthOption?: boolean;
  /**
   * By default, if both `inputValue` and `selectionValue` are empty, any `renderValue` will not be displayed.
   * Set this to true if you want `renderValue` to always be shown, regardless of `inputValue` or `selectionValue`.
   */
  preventEmpty?: boolean;
}
