export interface CounterMultiselectArgs {
  options: {
    id: number | string;
    label: string;
    selected?: boolean;
  }[];
  isCompact?: boolean;
  label?: React.ReactNode;
  onChange?: (selectedItems: CounterMultiselectArgs["options"]) => void;
  i18n?: {
    counterText?: (count: number) => string;
    noItems?: string;
    noMatches?: string;
  };
}
