type Item = {
  id: number;
  label: string;
  selected?: boolean;
};

export type MultiSelectProps = {
  maxItems?: number;
  options: Item[];
  listboxAppendToNode?: Element | DocumentFragment;
  selectedItems?: Item[];
  onChange?: (selectedItems: Item[], newItem?: string) => Promise<void>;
  creatable?: boolean;
  size: "small" | "medium";
  menuHeight?: string;
  isDisabled?: boolean;
  i18n: {
    placeholder?: string;
    label?: string;
    noMatches?: string;
    addNew?: (value: string) => string;
    showMore?: (value: number) => string;
  };
};
