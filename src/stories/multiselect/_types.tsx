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
  i18n: {
    label?: string;
    noMatches?: string;
    addNew?: (value: string) => string;
  };
};
