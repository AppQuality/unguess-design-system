import { ReactNode } from "react";
import { ComboboxProps } from "../combobox";
import { IOption } from "../selectOption";

type Item = {
  id: number;
  label: string;
  selected?: boolean;
  actions?: (props: { option: IOption; closeModal: () => void }) => ReactNode;
};

export interface MultiSelectProps extends Omit<ComboboxProps, "onChange"> {
  maxItems?: number;
  options: Item[];
  listboxAppendToNode?: Element | DocumentFragment;
  selectedItems?: Item[];
  onChange?: (selectedItems: Item[], newItem?: string) => Promise<void>;
  creatable?: boolean;
  isEditable?: boolean;
  size: "small" | "medium";
  menuHeight?: string;
  i18n: {
    placeholder?: string;
    label?: string;
    noMatches?: string;
    addNew?: (value: string) => string;
    showMore?: (value: number) => string;
  };
  disabled?: boolean;
  onBlur?: () => void;
};
