type Item = {
  id: string | number;
  label: string;
};

export type MultiSelectProps = {
  maxItems?: number;
  options: Item[];
  selectedItems?: Item[];
  onChange?: (selectedItems: Item[], newItem?: string) => Promise<Item[]>;
  creatable?: boolean;
  size: "small" | "medium";
  menuHeight?: string;
  i18n: {
    placeholder?: string;
    label?: string;
    noMatches?: string;
    addNew?: (value: string) => string;
  };
};
