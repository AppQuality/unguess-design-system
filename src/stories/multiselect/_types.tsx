type Item = {
  id: string | number;
  label: string;
};

export type MultiSelectProps = {
  /**
   * The options to display in the dropdown
   */
  options: Item[];
  selectedItems?: Item[];
  onChange?: (selectedItems: Item[]) => void;
  onCreate?: (newLabel: string) => Promise<Item>;
};
